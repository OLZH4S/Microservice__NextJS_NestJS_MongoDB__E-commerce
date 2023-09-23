const apiKey = '6d207e02198a847aa98d0a2a901485a5';

const apiUrl = 'https://freeimage.host/api/1/upload';

const requestUrl = `${apiUrl}?key=${apiKey}&format=json`;


async function uploadImage(imageData) {
    try {

        const buffer = Buffer.from(imageData.buffer.data)

        const formData = new FormData();
        formData.append(`source`, new Blob([buffer]));


        const response = await fetch(requestUrl, { method: "POST", body: formData });


        if (response.status === 200) {
            const responseData = await response.json();
            return responseData.image.url
        } else {
            console.error('Image upload failed. Status code:', response.status);
            console.error(response)
        }
    } catch (error) {
        console.error('Error:', error);
    }
}



export async function uploadImagesAndReturnArrayOfUrls(PICTURES) {
    const urlArray = []

    for (const image of PICTURES) {
        const imgUrl = await uploadImage(image)
        urlArray.push(imgUrl)
    }
    return urlArray
}

