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
  const throttleDelay = 3000; // Throttled to 3 seconds for optimized sync

  // 1. Fetch course details and user progress
=======
<<<<<<< HEAD
  const throttleDelay = 3000; // Increased to 3s for a "Premium" balance
=======
  const throttleDelay = 2000; // 2 sec
>>>>>>> 35975c69493032751758ba9568584d2f16146318

  // Fetch course + progress
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
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
<<<<<<< HEAD
        const fetchedCourse = courseRes.data;
        setCourse(fetchedCourse);
=======
        setCourse(courseRes.data);
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949

        const { videos = [], lastVideo } = progressRes.data;
        const progressMap = {};

<<<<<<< HEAD
        // Map backend progress data to frontend state
        videos.forEach((v) => {
          const vidId = v.videoId || v._id; // Handle both ID formats
          if (vidId) {
            progressMap[vidId] = {
              percent: v.progress || 0,
              lastTimestamp: v.lastTimestamp || 0,
              completed: !!v.completed,
              title: fetchedCourse.videos.find(cv => cv._id === vidId)?.title || "Untitled Lesson",
=======
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
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
            };
          }
        });

        setProgress(progressMap);

<<<<<<< HEAD
        // Resume Logic: Determine where the user left off
=======
<<<<<<< HEAD
        // Resume Logic
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
        let startVideo = null;
        if (lastVideo?.videoId) {
          startVideo = fetchedCourse.videos.find(
            (v) => v._id.toString() === lastVideo.videoId.toString()
          );
          
<<<<<<< HEAD
=======
          // Setup the Resume Toast state
=======
        // Save last watched video for display
        if (lastVideo?.videoId) {
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
          setLastWatchedVideo({
            videoId: lastVideo.videoId,
            percent: lastVideo.progress || 0,
            lastTimestamp: lastVideo.lastTimestamp || 0,
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
            title: fetchedCourse.videos.find(v => v._id === lastVideo.videoId)?.title || "Previous Lesson",
          });
        }

<<<<<<< HEAD
        // Fallback to first video if no history
        if (!startVideo && fetchedCourse.videos?.length > 0) {
          startVideo = fetchedCourse.videos[0];
=======
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
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
        }

        if (startVideo) {
          setCurrentVideo({
            ...startVideo,
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
            videoId: startVideo._id.toString(),
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
            lastTimestamp: progressMap[startVideo._id]?.lastTimestamp || 0,
          });
        }
      })
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
      .catch((err) => console.error("❌ Hook Fetch Error:", err))
      .finally(() => setLoading(false));
  }, [courseId, token]);

<<<<<<< HEAD
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

=======
  // Sync Video Time on manual change or initial load
  useEffect(() => {
    const video = videoRef.current;
    if (video && currentVideo?.lastTimestamp) {
      const onLoadedMetadata = () => {
        video.currentTime = currentVideo.lastTimestamp;
      };
      video.addEventListener("loadedmetadata", onLoadedMetadata);
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
      return () => video.removeEventListener("loadedmetadata", onLoadedMetadata);
    }
  }, [currentVideo]);

<<<<<<< HEAD
  // 3. Save progress (throttled)
=======
=======
      .catch((err) => console.error("Error fetching course data:", err))
      .finally(() => setLoading(false));
  }, [courseId, token]);

>>>>>>> 35975c69493032751758ba9568584d2f16146318
  // Save progress (throttled)
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  const handleProgress = useCallback(
    (videoId, percentValue, lastTimestamp = 0) => {
      if (!videoId || !token) return;

      const now = Date.now();
      if (now - (lastSentRef.current[videoId] || 0) < throttleDelay) return;
      lastSentRef.current[videoId] = now;

      const cleanPercent = Math.min(Math.max(Number(percentValue) || 0, 0), 100);
      const cleanTimestamp = Math.max(Number(lastTimestamp) || 0, 0);

<<<<<<< HEAD
      // Optimistic Update: Update UI instantly before server confirms
=======
<<<<<<< HEAD
      // Optimistic Update
=======
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
      setProgress((prev) => ({
        ...prev,
        [videoId]: {
          ...(prev[videoId] || {}),
          percent: cleanPercent,
          lastTimestamp: cleanTimestamp,
<<<<<<< HEAD
          completed: prev[videoId]?.completed || cleanPercent >= 90,
=======
<<<<<<< HEAD
          completed: prev[videoId]?.completed || cleanPercent >= 90,
=======
          completed: cleanPercent >= 90,
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
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
<<<<<<< HEAD
        .catch((err) => console.error("❌ Progress Sync Error:", err));
=======
        .then((res) => console.log("✅ Progress saved:", res.data))
        .catch((err) =>
          console.error("❌ Error saving progress:", err.response?.data || err)
        );
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
    },
    [courseId, token]
  );

<<<<<<< HEAD
  // 4. Switch current video
=======
<<<<<<< HEAD
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  const handleVideoChange = useCallback(
    (video) => {
      if (!video?._id) return;
      const prog = progress[video._id] || {};
      
      setCurrentVideo({
        ...video,
        lastTimestamp: prog.lastTimestamp || 0,
      });

<<<<<<< HEAD
      // Clear the resume prompt once the user manually picks a video
      setLastWatchedVideo(null);

      // Explicitly load and try to play
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch((err) => console.warn("Autoplay blocked by browser:", err));
      }
=======
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
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
    },
    [progress]
  );

<<<<<<< HEAD
  // 5. Autoplay next video on completion
=======
<<<<<<< HEAD
=======
  // Autoplay next video on ended
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
  const handleVideoEnded = useCallback(() => {
    if (!course || !currentVideo) return;
    const idx = course.videos.findIndex((v) => v._id === currentVideo._id);
    if (idx >= 0 && idx < course.videos.length - 1) {
      handleVideoChange(course.videos[idx + 1]);
    }
  }, [course, currentVideo, handleVideoChange]);

<<<<<<< HEAD
  // 6. Computed completion percentage
=======
<<<<<<< HEAD
=======
  // Computed course completion %
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 35975c69493032751758ba9568584d2f16146318
>>>>>>> 16cb5ced5963fb7d62ed500a1e58d4124ecd8949
