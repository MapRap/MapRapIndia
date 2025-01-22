import { useState } from "react";
import { generateReactHelpers } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { uploadPdfLink } from "@/_actions/uploadPdfLink";
import { Button } from "../ui/button";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();
export const PdfUploadForm = ({ jobId }: { jobId: string }) => {
  console.log(jobId);
  const { startUpload, isUploading } = useUploadThing("pdfUploader");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false); // State to track if upload is complete

  const handlePdfUpload = async (files: File[]) => {
    try {
      const result = await startUpload(files);
      if (result && result.length > 0) {
        setPdfUrl(result[0].url); // Set the uploaded file URL
        setIsUploaded(true); // Mark the upload as completed
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleRemovePdf = () => {
    setPdfUrl(null); // Remove the PDF URL
    setIsUploaded(false); // Reset the uploaded state
  };

  return (
    <div className="flex flex-col">
      {!isUploaded && (
        <div>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handlePdfUpload(Array.from(e.target.files || []))}
            // ploaceholder="Upload"
            id="pdf-upload"
            style={{ display: "none" }}
          />
          <label
            htmlFor="pdf-upload"
            style={{
              cursor: "pointer",
              padding: "10px 15px",
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "5px",
            }}
          >
            {isUploading ? "Uploading..." : "Upload PDF(Max:16MB)"}
          </label>

          <button disabled={isUploading}>
            {isUploading && "Uploading..."}
          </button>
        </div>
      )}
      {isUploaded && pdfUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Uploaded PDF:</h3>
          <iframe
            src={pdfUrl}
            width="100%"
            height="600px"
            style={{ border: "none" }}
            title="PDF Viewer"
          />
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={handleRemovePdf}
              className="bg-red-600 text-white hover:bg-red-700 p-2 rounded-xl"
            >
              Remove PDF
            </button>
            <Button
              onClick={() => {
                uploadPdfLink({ pdf: pdfUrl, id: jobId }).then((e) => {
                  if (!e) {
                    setMessage("Network Error! Please try again later");
                  }
                  if (e) {
                    if (e === "Error") {
                      setMessage("Network Error! Please try again later");
                    }
                    // console.log(e);
                    setMessage("Uploaded pdf!");
                    window.location.reload();
                  }
                });
              }}
              className="bg-green-600 hover:bg-green-700 m-2"
            >
              Submit
            </Button>
            <div className="text-red-600">{message}</div>
          </div>
        </div>
      )}
    </div>
  );
};
