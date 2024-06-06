import React from "react";
import { useRouter } from "next/router";
import RootLayout from "@/app/layout"; // Adjust the import based on your actual layout file location
import Playlist from "@/components/Playlist"; // Adjust the import based on your actual component file location

const PlaylistPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <RootLayout>
      <Playlist playlistId={id} />
    </RootLayout>
  );
};

export default PlaylistPage;
