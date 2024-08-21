import { useUploadExcelMutation, useRetrieveSalarySlipQuery } from "../../redux/features/salaryApiSlice";
import TableData from "../TableData";
import Spinner from "../../components/Spinner";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

export default function SalarySlip() {
    const [file, setFile] = useState(null);
    const { data: salaryslips, isFetching, refetch } = useRetrieveSalarySlipQuery();
    const [uploadExcel, { isLoading }] = useUploadExcelMutation();
    const [error, setError] = useState("");
    const toast = useToast()

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            // Check if the file is an Excel file
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
            if (fileExtension === 'xlsx' || fileExtension === 'xls') {
                setFile(selectedFile);
                setError(""); // Clear any previous error
            } else {
                setFile(null);
                setError("Please upload a valid Excel file (.xlsx, .xls).");
            }
        }
    };

    const handleFileUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            uploadExcel(formData)
            .unwrap()
            .then((response) => {
                toast({
                    title: 'File Processed',
                    description: response.message,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                setFile(null);
                refetch();
            })
            .catch((error) => {
                console.log(error);
            })
            
        }
    };

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Excel files only (MAX. 10MB)</p>
                    </div>
                    <input 
                        id="dropzone-file" 
                        type="file" 
                        accept=".xlsx, .xls" 
                        className="hidden" 
                        onChange={handleFileChange}
                    />
                </label>
            </div>

            {file && (
                <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                    Selected file: {file.name}
                </div>
            )}

            {error && (
                <div className="mt-2 text-center text-sm text-red-500 dark:text-red-400">
                    {error}
                </div>
            )}

            {file && (
                <div className="flex justify-center mt-4">
                    <button 
                        onClick={handleFileUpload}
                        disabled={isLoading}
                        className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Uploading...' : 'Upload File'}
                    </button>
                </div>
            )}

            {isFetching ? <Spinner /> : <TableData data={salaryslips} />}
        </div>
    );
}
