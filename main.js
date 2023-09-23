async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const resultDiv = document.getElementById("result");
    const uploadingMessage = document.querySelector(".uploading-message");
    const qrcodeDiv = document.getElementById("qrcode");

    if (!fileInput.files.length) {
        resultDiv.textContent = "Please select a file.";
        return;
    }

    const file = fileInput.files[0];

    // Show the "Uploading..." message
    uploadingMessage.style.display = "block";

    // Create a FormData object
    const formData = new FormData();
    formData.append("file", file);

    try {
        // Upload the file to nft.storage
        const response = await fetch("https://api.nft.storage/upload", {
            method: "POST",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBhZmVjM0FlMzZkMTlhNjFBZGRhMGFCMzVEMjZjOTdGMDZjODA3RjQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NDA4MTk2MjAyMywibmFtZSI6IkhBQ0tBVEhPTiJ9.2PCTZQBPIg4y2dtxGRdpNO6Akp2UAXumJIdEOKpx9NQ", // Replace with your API key
            },
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            // Display the CID (Content Identifier) of the uploaded file
            resultDiv.textContent = `File uploaded successfully! CID: ${data.value.cid}`;
            
            // Generate and display the QR code
            const qrCodeText = `https://ipfs.io/ipfs/${data.value.cid}/${encodeURIComponent(file.name)}`;
            const qrcode = new QRCode(qrcodeDiv, {
                text: qrCodeText,
                width: 128,
                height: 128,
            });
        } else {
            // Handle the error
            resultDiv.textContent = `Error: ${data.error.message}`;
        }
    } catch (error) {
        console.error(error);
        resultDiv.textContent = "An error occurred while uploading the file.";
    } finally {
        // Hide the "Uploading..." message
        uploadingMessage.style.display = "none";
    }
}
