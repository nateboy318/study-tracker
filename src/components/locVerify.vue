<template>
  <div>
    <div class="locVerify">
      <h2>
        You are in the library:
        <span :class="locationStatus" id="status">{{ statusMessage }}</span>
      </h2>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const isLocationApproved = ref(false); // Default to false until verified

const locationStatus = computed(() => {
  return isLocationApproved.value ? "approved" : "unapproved";
});

const statusMessage = computed(() => {
  return isLocationApproved.value ? "Yes" : "No";
});

onMounted(() => {
  // Watch for changes in location
  navigator.geolocation.watchPosition(handleLocationChange, handleError, {
    enableHighAccuracy: true,
  });
});

const handleLocationChange = (position) => {
  const { latitude, longitude } = position.coords;
  const isInLibrary = checkLocation(latitude, longitude);
  isLocationApproved.value = isInLibrary;
  console.log("Current Position:", position.coords);
};

const handleError = (error) => {
  console.error("Geolocation error:", error);
  // Handle errors or set default behavior
};

const checkLocation = (lat, lng) => {
  // Define the coordinates of the library
  const libraryLatitude = 38.2078855;
  const libraryLongitude = -85.7631498;

  // Calculate the distance between the user's location and the library
  const distance = calculateDistance(
    lat,
    lng,
    libraryLatitude,
    libraryLongitude
  );

  // Determine if the user is within the geofence (100 meters radius)
  return distance <= 100;
};

const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const earthRadius = 6371e3; // Earth's radius in meters
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lng2 - lng1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance;
};

const toRadians = (degrees) => {
  return (degrees * Math.PI) / 180;
};
</script>

<style scoped>
.locVerify {
  margin-top: 10px;
}
</style>
