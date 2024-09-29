import { useEffect, useState } from "react";

type Permission = "geolocation" | "camera" | "microphone" | "notifications";

export function usePermissions(permission: Permission) {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>();

  const requestPermission = async () => {
    await navigator.permissions.query({ name: permission as PermissionName })
      .then(
        (permission) => {
          setPermissionStatus(permission);
        },
      ).catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    (async () => {
      await requestPermission();
    })();
  }, [permission]);

  return {
    requestPermission,
    permissionStatus,
    isGranted: permissionStatus?.state === "granted",
    isDenied: permissionStatus?.state === "denied",
    isPrompt: permissionStatus?.state === "prompt",
  };
}
