import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import axios from "axios";
import BACK_URL from "../api";

export default function useCourseProgress(courseId, { token, userId } = {}) {
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState({});
  const [currentVideo, setCurrentVideo] = useState(null);
  const [lastWatchedVideo, setLastWatchedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const videoRef = useRef(null);
  const lastSentRef = useRef({});
  const throttleDelay = 3000; // Throttled to 3 seconds for optimized sync

  // 1. Fetch course details and user progress
  useEffect(() => {
    if (!courseId || !token) return;
    setLoading(true);

    Promise.all([
      axios.get(`${BACK_URL}/api/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${BACK_URL}/api/progress/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
      .then(([courseRes, progressRes]) => {
        const fetchedCourse = courseRes.data;
        setCourse(fetchedCourse);

        const { videos = [], lastVideo } = progressRes.data;
        const progressMap = {};

        // Map backend progress data to frontend state
        videos.forEach((v) => {
          const vidId = v.videoId || v._id; // Handle both ID formats
          if (vidId) {
            progressMap[vidId] = {
              percent: v.progress || 0,
              lastTimestamp: v.lastTimestamp || 0,
              completed: !!v.completed,
              title: fetchedCourse.videos.find(cv => cv._id === vidId)?.title || "Untitled Lesson",
            };
          }
        });

        setProgress(progressMap);

        // Resume Logic: Determine where the user left off
        let startVideo = null;
        if (lastVideo?.videoId) {
          startVideo = fetchedCourse.videos.find(
            (v) => v._id.toString() === lastVideo.videoId.toString()
          );
          
          setLastWatchedVideo({
            videoId: lastVideo.videoId,
            percent: lastVideo.progress || 0,
            lastTimestamp: lastVideo.lastTimestamp || 0,
            title: fetchedCourse.videos.find(v => v._id === lastVideo.videoId)?.title || "Previous Lesson",
          });
        }

        // Fallback to first video if no history
        if (!startVideo && fetchedCourse.videos?.length > 0) {
          startVideo = fetchedCourse.videos[0];
        }

        if (startVideo) {
          setCurrentVideo({
            ...startVideo,
            lastTimestamp: progressMap[startVideo._id]?.lastTimestamp || 0,
          });
        }
      })
      .catch((err) => console.error("❌ Hook Fetch Error:", err))
      .finally(() => setLoading(false));
  }, [courseId, token]);

  // 2. Sync Video Time on manual change or initial load
  useEffect(() => {
    const video = videoRef.current;
    if (video && currentVideo) {
      const lastPos = currentVideo.lastTimestamp || 0;
      
      const onLoadedMetadata = () => {
        video.currentTime = lastPos;
      };

      video.addEventListener("loadedmetadata", onLoadedMetadata);
      // Fallback if metadata is already loaded
      if (video.readyState >= 1) onLoadedMetadata();

      return () => video.removeEventListener("loadedmetadata", onLoadedMetadata);
    }
  }, [currentVideo]);

  // 3. Save progress (throttled)
  const handleProgress = useCallback(
    (videoId, percentValue, lastTimestamp = 0) => {
      if (!videoId || !token) return;

      const now = Date.now();
      if (now - (lastSentRef.current[videoId] || 0) < throttleDelay) return;
      lastSentRef.current[videoId] = now;

      const cleanPercent = Math.min(Math.max(Number(percentValue) || 0, 0), 100);
      const cleanTimestamp = Math.max(Number(lastTimestamp) || 0, 0);

      // Optimistic Update: Update UI instantly before server confirms
      setProgress((prev) => ({
        ...prev,
        [videoId]: {
          ...(prev[videoId] || {}),
          percent: cleanPercent,
          lastTimestamp: cleanTimestamp,
          completed: prev[videoId]?.completed || cleanPercent >= 90,
        },
      }));

      axios
        .post(
          `${BACK_URL}/api/progress/update`,
          { courseId, videoId, progress: cleanPercent, lastTimestamp: cleanTimestamp },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .catch((err) => console.error("❌ Progress Sync Error:", err));
    },
    [courseId, token]
  );

  // 4. Switch current video
  const handleVideoChange = useCallback(
    (video) => {
      if (!video?._id) return;
      const prog = progress[video._id] || {};
      
      setCurrentVideo({
        ...video,
        lastTimestamp: prog.lastTimestamp || 0,
      });

      // Clear the resume prompt once the user manually picks a video
      setLastWatchedVideo(null);

      // Explicitly load and try to play
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch((err) => console.warn("Autoplay blocked by browser:", err));
      }
    },
    [progress]
  );

  // 5. Autoplay next video on completion
  const handleVideoEnded = useCallback(() => {
    if (!course || !currentVideo) return;
    const idx = course.videos.findIndex((v) => v._id === currentVideo._id);
    if (idx >= 0 && idx < course.videos.length - 1) {
      handleVideoChange(course.videos[idx + 1]);
    }
  }, [course, currentVideo, handleVideoChange]);

  // 6. Computed completion percentage
  const completionPercent = useMemo(() => {
    if (!course?.videos?.length) return 0;
    const total = course.videos.length;
    const completed = Object.values(progress).filter((p) => p.completed).length;
    return Math.round((completed / total) * 100);
  }, [course, progress]);

  return {
    course,
    progress,
    currentVideo,
    lastWatchedVideo,
    loading,
    handleProgress,
    handleVideoChange,
    handleVideoEnded,
    completionPercent,
    videoRef,
  };
}