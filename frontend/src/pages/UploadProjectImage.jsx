import { useState } from "react";
import { uploadImage } from "../services/projectApi";

export default function UploadProjectImage({ projectId }) {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState("");

  const handleUpload = async () => {
    const res = await uploadImage(projectId, file);
    setUploaded(res.data.url);
  };

  return (
    <div className="space-y-3">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="p-2 bg-blue-600 text-white">Upload</button>

      {uploaded && <img src={uploaded} className="w-40 mt-3" />}
    </div>
  );
}
