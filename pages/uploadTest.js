import { useState } from 'react';
import { useS3Upload } from 'next-s3-upload';

export default function UploadTest() {
    let [fileUrl, setFileUrl] = useState("");
    let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

    let handleFileChange = async file => {
        let { url } = await uploadToS3(file);
        setFileUrl(url);
    };

    useEffect(() => {
        console.log(fileUrl)
    }, [fileUrl])
    return (
        <div className="bg-white">
            <FileInput onChange={handleFileChange} />
            <button onClick={openFileDialog}>Upload file</button>
        </div>
    );
}