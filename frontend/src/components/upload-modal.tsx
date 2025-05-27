

// "use client";

// import React, { useState, useCallback, useEffect } from "react";
// import { useDropzone } from "react-dropzone";
// import { Camera, Upload, AlertTriangle, CheckCircle } from "lucide-react";
// import { Dialog } from "@/components/ui/dialog";
// import { DialogContent } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import axios from "axios";

// interface UploadModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
//   const [extractedInfo, setExtractedInfo] = useState<Record<string, string> | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [comparisonResult, setComparisonResult] = useState<any>(null);

//   const onDrop = useCallback(async (acceptedFiles: File[]) => {
//     if (acceptedFiles.length === 0) return;

//     const file = acceptedFiles[0];
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setUploading(true);
//       setExtractedInfo(null); // Clear previous data
//       setComparisonResult(null); // Clear previous comparison results

//       const response = await axios.post("http://localhost:4000/api/user/uploads", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("API Response:", response.data); // Debug API response

//       // Parse the extracted_info from API response
//       let extractedInfoStr = response.data.extracted_info || "";
//       try {
//         // Try to parse as JSON first
//         const parsedInfo = JSON.parse(extractedInfoStr);
//         const extractedData: Record<string, string> = {};
        
//         // Convert the JSON object to key-value pairs for display
//         Object.entries(parsedInfo).forEach(([key, value]) => {
//           extractedData[key] = String(value);
//         });
        
//         setExtractedInfo(extractedData);
//       } catch (e) {
//         // If not valid JSON, try to parse as text (fallback)
//         const extractedData: Record<string, string> = {};
//         extractedInfoStr.split("\n").forEach((line) => {
//           const parts = line.split(":");
//           if (parts.length === 2) {
//             const key = parts[0].trim();
//             const value = parts[1].trim().replace(/[^a-zA-Z0-9\s-]/g, "");
//             extractedData[key] = value;
//           }
//         });
//         setExtractedInfo(extractedData);
//       }

//       // Process and save the comparison result
//       if (response.data.comparison_result) {
//         let result = response.data.comparison_result;
        
//         // Check if we need to parse the message (it might contain the JSON inside a code block)
//         if (typeof result.message === 'string' && result.message.includes('```json')) {
//           try {
//             // Extract and parse JSON from markdown code block if present
//             const jsonMatch = result.message.match(/```json\s*([\s\S]*?)\s*```/);
//             if (jsonMatch && jsonMatch[1]) {
//               const parsedResult = JSON.parse(jsonMatch[1].trim());
//               // Merge with the existing result
//               result = { ...result, ...parsedResult };
//             }
//           } catch (e) {
//             console.error("Error parsing JSON from message:", e);
//           }
//         }
        
//         setComparisonResult(result);
//       }
//     } catch (error) {
//       console.error("Upload failed:", error);
//       setExtractedInfo({ Error: "Failed to process the document. Try again." });
//     } finally {
//       setUploading(false);
//     }
//   }, []);

//   useEffect(() => {
//     console.log("Updated Extracted Info:", extractedInfo);
//     console.log("Comparison Result:", comparisonResult);
//   }, [extractedInfo, comparisonResult]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "image/*": [".jpeg", ".jpg", ".png"],
//       "application/pdf": [".pdf"],
//     },
//   });

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[900px] p-0">
//         <div className="grid grid-cols-1 md:grid-cols-2">
          
//           {/* Upload Section */}
//           <div className="p-6">
//             <div
//               {...getRootProps()}
//               className={cn(
//                 "border-2 border-dashed rounded-lg h-64 flex flex-col items-center justify-center cursor-pointer transition-colors",
//                 isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
//               )}
//             >
//               <input {...getInputProps()} />
//               <Upload className="w-12 h-12 text-gray-400 mb-4" />
//               <p className="text-sm text-gray-600 text-center">
//                 {isDragActive ? "Drop your document here" : "Drag and drop your document here"}
//               </p>
//               <p className="text-sm text-gray-500 mt-2">or click to upload</p>
//             </div>

//             <div className="mt-6 space-y-3">
//               <Button variant="default" className="w-full bg-gray-900 hover:bg-gray-800" disabled={uploading}>
//                 {uploading ? "Uploading..." : (
//                   <>
//                     <Camera className="w-4 h-4 mr-2" />
//                     Scan Document
//                   </>
//                 )}
//               </Button>
//               <Button variant="outline" className="w-full" disabled={uploading}>
//                 <Upload className="w-4 h-4 mr-2" />
//                 Upload Image
//               </Button>
//             </div>
//           </div>

//           {/* Extracted Information Section */}
//           <div className="border-l p-6">
//             <h3 className="text-lg font-semibold mb-4">Extracted Information</h3>
//             {extractedInfo && Object.keys(extractedInfo).length > 0 ? (
//               <table className="w-full border-collapse border border-gray-300">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="border border-gray-300 px-4 py-2">Key</th>
//                     <th className="border border-gray-300 px-4 py-2">Value</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {Object.entries(extractedInfo).map(([key, value], index) => (
//                     <tr key={index}>
//                       <td className="border border-gray-300 px-4 py-2 font-medium">{key}</td>
//                       <td className="border border-gray-300 px-4 py-2">{value}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="text-center text-gray-500 py-12">
//                 <p>Upload a document to see extracted information</p>
//               </div>
//             )}
            
//             {/* AI Suggestion Notification */}
//             {extractedInfo && Object.keys(extractedInfo).length > 0 && (
//               <div className={cn(
//                 "mt-6 p-4 border rounded-lg shadow-md",
//                 comparisonResult?.isMatch 
//                   ? "border-green-400 bg-green-100 text-green-900" 
//                   : "border-yellow-400 bg-yellow-100 text-yellow-900"
//               )}>
//                 <div className="flex items-center space-x-3">
//                   {comparisonResult?.isMatch ? (
//                     <CheckCircle className="w-6 h-6 text-green-600" />
//                   ) : (
//                     <AlertTriangle className="w-6 h-6 text-yellow-600" />
//                   )}
//                   <h4 className="text-lg font-semibold">AI Suggestion:</h4>
//                 </div>
                
//                 {comparisonResult ? (
//                   // Display dynamic AI-generated message from the backend
//                   <div className="mt-2 text-sm">
//                     <p>{comparisonResult.message && comparisonResult.message.includes('```') 
//                       ? comparisonResult.message.replace(/```json[\s\S]*?```/g, '') 
//                       : comparisonResult.message}
//                     </p>
                    
//                     {!comparisonResult.isMatch && (
//                       <p className="mt-2">
//                         🔹 <strong>How to Change It?</strong> Visit the <a href="https://uidai.gov.in/" target="_blank" className="text-blue-600 font-medium underline">UIDAI Website</a> or your nearest Aadhaar center.
//                         <br />
//                         🔹 <strong>Impact on Forms:</strong> Incorrect information can cause <strong>rejections in passport, and bank applications</strong>.
//                       </p>
//                     )}
//                   </div>
//                 ) : (
//                   // Fallback to default message if no comparison result
//                   <div className="mt-2 text-sm">
//                     <p>
//                       Your Date of Birth <strong>does not match.</strong>
//                     </p>
//                     <p className="mt-2">
//                       🔹 <strong>How to Change It?</strong> Visit the <a href="https://pan.utiitsl.com/PAN/csf.html" target="_blank" className="text-blue-600 font-medium underline">PAN Service Portal</a> or your nearest PAN centre. 
//                       <br />
//                       🔹 <strong>Impact on Forms:</strong> Incorrect DOB can cause <strong> delays or rejections in pension schemes if your PAN is linked to your bank for subsidies.</strong>.  
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
          
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UploadModal;


import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Camera, Upload, AlertTriangle, CheckCircle, FileText, Loader2 } from "lucide-react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const [extractedInfo, setExtractedInfo] = useState<Record<string, string> | null>(null);
  const [uploading, setUploading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    console.log("File selected:", file.name, "Size:", file.size, "Type:", file.type);

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setError(null);
      setExtractedInfo(null);
      setComparisonResult(null);

      console.log("Uploading file to API...");

      const response = await fetch("http://localhost:4000/api/user/uploads", {
        method: "POST",
        body: formData,
      });

      console.log("API Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response data:", data);

      // Process extracted information
      if (data.extracted_info) {
        try {
          const parsedInfo = typeof data.extracted_info === 'string' 
            ? JSON.parse(data.extracted_info) 
            : data.extracted_info;
          
          // Convert to display format
          const displayData: Record<string, string> = {};
          Object.entries(parsedInfo).forEach(([key, value]) => {
            // Format key names for display
            const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            displayData[formattedKey] = String(value);
          });
          
          setExtractedInfo(displayData);
        } catch (parseError) {
          console.error("Error parsing extracted info:", parseError);
          setExtractedInfo({ "Error": "Failed to parse document information" });
        }
      }

      // Process comparison result
      if (data.comparison_result) {
        setComparisonResult(data.comparison_result);
      }

    } catch (error) {
      console.error("Upload failed:", error);
      setError(error instanceof Error ? error.message : "Failed to process document");
      setExtractedInfo({ "Error": "Document processing failed" });
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
      "application/pdf": [".pdf"],
    },
    multiple: false,
    disabled: uploading
  });

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setExtractedInfo(null);
      setComparisonResult(null);
      setError(null);
      setUploading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Document Verification</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            disabled={uploading}
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-h-[calc(90vh-80px)] overflow-y-auto">
          
          {/* Upload Section */}
          <div className="space-y-6">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg h-64 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                isDragActive 
                  ? "border-blue-500 bg-blue-50 scale-105" 
                  : uploading
                  ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <input {...getInputProps()} />
              
              {uploading ? (
                <>
                  <Loader2 className="w-12 h-12 text-blue-500 mb-4 animate-spin" />
                  <p className="text-sm text-gray-600 text-center font-medium">
                    Processing your document...
                  </p>
                  <p className="text-xs text-gray-500 mt-1">This may take a few moments</p>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 text-center font-medium">
                    {isDragActive ? "Drop your document here" : "Drag and drop your document here"}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Supports: JPG, PNG, PDF (Max 10MB)
                  </p>
                </>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <p className="text-red-700 font-medium">Upload Error</p>
                </div>
                <p className="text-red-600 text-sm mt-1">{error}</p>
              </div>
            )}

            <div className="space-y-3">
              <button 
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                  uploading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
                disabled={uploading}
                onClick={() => document.querySelector('input[type="file"]')?.click()}
              >
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Camera className="w-4 h-4" />
                )}
                <span>{uploading ? "Processing..." : "Upload Document"}</span>
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Extracted Information</span>
              </h3>
              
              {extractedInfo && Object.keys(extractedInfo).length > 0 ? (
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Field</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(extractedInfo).map(([key, value], index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{key}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : uploading ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" />
                  <p className="text-gray-600">Extracting information...</p>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Upload a document to see extracted information</p>
                </div>
              )}
            </div>

            {/* Verification Result */}
            {comparisonResult && extractedInfo && (
              <div className={`rounded-lg p-4 border-l-4 ${
                comparisonResult.isMatch 
                  ? "bg-green-50 border-green-400" 
                  : "bg-yellow-50 border-yellow-400"
              }`}>
                <div className="flex items-start space-x-3">
                  {comparisonResult.isMatch ? (
                    <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                  )}
                  
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-2 ${
                      comparisonResult.isMatch ? "text-green-800" : "text-yellow-800"
                    }`}>
                      {comparisonResult.isMatch ? "✅ Verification Successful" : "⚠️ Verification Alert"}
                    </h4>
                    
                    <p className={`text-sm leading-relaxed ${
                      comparisonResult.isMatch ? "text-green-700" : "text-yellow-700"
                    }`}>
                      {comparisonResult.message}
                    </p>

                    {!comparisonResult.isMatch && (
                      <div className="mt-3 text-sm text-yellow-700">
                        <p className="font-medium mb-2">📋 Next Steps:</p>
                        <ul className="space-y-1 ml-4">
                          <li>• Verify your document details are correct</li>
                          <li>• Update information through official channels if needed</li>
                          <li>• Ensure all documents have consistent information</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;