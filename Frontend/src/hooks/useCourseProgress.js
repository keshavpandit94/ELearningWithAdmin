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
<<<<<<< HEAD
  const throttleDelay = 3000; // Increased to 3s for a "Premium" balance
=======
  const throttleDelay = 2000; // 2 sec
>>>>>>> 35975c69493032751758ba9568584d2f16146318

  // Fetch course + progress
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
<<<<<<< HEAD
        const fetchedCourse = courseRes.data;
        setCourse(fetchedCourse);
=======
        setCourse(courseRes.data);
>>>>>>> 35975c69493032751758ba9568584d2f16146318

        const { videos = [], lastVideo } = progressRes.data;
        const progressMap = {};

        videos.forEach((v) => {
<<<<<<< HEAD
          if (v?.videoId) {
            progressMap[v.videoId] = {
              percent: v.progress || 0,
              lastTimestamp: v.lastTimestamp || 0,
              completed: !!v.completed,
              title: fetchedCourse.videos.find(cv => cv._id === v.videoId)?.title || "Untitled Lesson",
=======
          if (v?._id) {
            progressMap[v._id] = {
              percent: v.progress || 0,
              lastTimestamp: v.lastTimestamp || 0,
              completed: !!v.completed,
              title: v.title || "",
>>>>>>> 35975c69493032751758ba9568584d2f16146318
            };
          }
        });

        setProgress(progressMap);

<<<<<<< HEAD
        // Resume Logic
        let startVideo = null;
        if (lastVideo?.videoId) {
          startVideo = fetchedCourse.videos.find(
            (v) => v._id.toString() === lastVideo.videoId.toString()
          );
          
          // Setup the Resume Toast state
=======
        // Save last watched video for display
        if (lastVideo?.videoId) {
>>>>>>> 35975c69493032751758ba9568584d2f16146318
          setLastWatchedVideo({
            videoId: lastVideo.videoId,
            percent: lastVideo.progress || 0,
            lastTimestamp: lastVideo.lastTimestamp || 0,
<<<<<<< HEAD
            title: fetchedCourse.videos.find(v => v._id === lastVideo.videoId)?.title || "Previous Lesson",
          });
        }

        // Fallback to first video
        if (!startVideo && fetchedCourse.videos?.length > 0) {
          startVideo = fetchedCourse.videos[0];
=======
            completed: !!lastVideo.completed,
            title: videos.find((v) => v._id === lastVideo.videoId)?.title || "",
          });
        } else {
          setLastWatchedVideo(null);
        }

        // Set video to resume
        let startVideo = null;
        if (lastVideo?.videoId) {
          startVideo = courseRes.data.videos.find(
            (v) => v._id?.toString() === lastVideo.videoId?.toString()
          );
        }
        if (!startVideo && courseRes.data.videos?.length > 0) {
          startVideo = courseRes.data.videos[0];
>>>>>>> 35975c69493032751758ba9568584d2f16146318
        }

        if (startVideo) {
          setCurrentVideo({
            ...startVideo,
<<<<<<< HEAD
=======
            videoId: startVideo._id.toString(),
>>>>>>> 35975c69493032751758ba9568584d2f16146318
            lastTimestamp: progressMap[startVideo._id]?.lastTimestamp || 0,
          });
        }
      })
<<<<<<< HEAD
      .catch((err) => console.error("❌ Hook Fetch Error:", err))
      .finally(() => setLoading(false));
  }, [courseId, token]);

  // Sync Video Time on manual change or initial load
  useEffect(() => {
    const video = videoRef.current;
    if (video && currentVideo?.lastTimestamp) {
      const onLoadedMetadata = () => {
        video.currentTime = currentVideo.lastTimestamp;
      };
      video.addEventListener("loadedmetadata", onLoadedMetadata);
      return () => video.removeEventListener("loadedmetadata", onLoadedMetadata);
    }
  }, [currentVideo]);

=======
      .catch((err) => console.error("Error fetching course data:", err))
      .finally(() => setLoading(false));
  }, [courseId, token]);

>>>>>>> 35975c69493032751758ba9568584d2f16146318
  // Save progress (throttled)
  const handleProgress = useCallback(
    (videoId, percentValue, lastTimestamp = 0) => {
      if (!videoId || !token) return;

      const now = Date.now();
      if (now - (lastSentRef.current[videoId] || 0) < throttleDelay) return;
      lastSentRef.current[videoId] = now;

      const cleanPercent = Math.min(Math.max(Number(percentValue) || 0, 0), 100);
      const cleanTimestamp = Math.max(Number(lastTimestamp) || 0, 0);

<<<<<<< HEAD
      // Optimistic Update
=======
>>>>>>> 35975c69493032751758ba9568584d2f16146318
      setProgress((prev) => ({
        ...prev,
        [videoId]: {
          ...(prev[videoId] || {}),
          percent: cleanPercent,
          lastTimestamp: cleanTimestamp,
<<<<<<< HEAD
          completed: prev[videoId]?.completed || cleanPercent >= 90,
=======
          completed: cleanPercent >= 90,
>>>>>>> 35975c69493032751758ba9568584d2f16146318
        },
      }));

      axios
        .post(
          `${BACK_URL}/api/progress/update`,
          { courseId, videoId, progress: cleanPercent, lastTimestamp: cleanTimestamp },
          { headers: { Authorization: `Bearer ${token}` } }
        )
<<<<<<< HEAD
        .catch((err) => console.error("❌ Progress Sync Error:", err));
=======
        .then((res) => console.log("✅ Progress saved:", res.data))
        .catch((err) =>
          console.error("❌ Error saving progress:", err.response?.data || err)
        );
>>>>>>> 35975c69493032751758ba9568584d2f16146318
    },
    [courseId, token]
  );

<<<<<<< HEAD
  const handleVideoChange = useCallback(
    (video) => {
      if (!video?._id) return;
      const prog = progress[video._id] || {};
      
      setCurrentVideo({
        ...video,
        lastTimestamp: prog.lastTimestamp || 0,
      });

      // Clear the resume toast once the user interacts/changes video
      setLastWatchedVideo(null);
=======
  // Switch current video
  const handleVideoChange = useCallback(
    (video) => {
      if (!video?._id) return;

      const prog = progress[video._id] || {};
      const lastTimestamp = prog.lastTimestamp || 0;

      setCurrentVideo({
        ...video,
        videoId: video._id.toString(),
        lastTimestamp,
      });

      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.currentTime = lastTimestamp;
        videoRef.current.play().catch((err) =>
          console.warn("Autoplay prevented:", err)
        );
      }
>>>>>>> 35975c69493032751758ba9568584d2f16146318
    },
    [progress]
  );

<<<<<<< HEAD
=======
  // Autoplay next video on ended
>>>>>>> 35975c69493032751758ba9568584d2f16146318
  const handleVideoEnded = useCallback(() => {
    if (!course || !currentVideo) return;
    const idx = course.videos.findIndex((v) => v._id === currentVideo._id);
    if (idx >= 0 && idx < course.videos.length - 1) {
      handleVideoChange(course.videos[idx + 1]);
    }
  }, [course, currentVideo, handleVideoChange]);

<<<<<<< HEAD
=======
  // Computed course completion %
>>>>>>> 35975c69493032751758ba9568584d2f16146318
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 35975c69493032751758ba9568584d2f16146318
