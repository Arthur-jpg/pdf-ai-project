import AWS from 'aws-sdk'
export async function uploadToS3(file: File) {
    try {
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_S3_ACESS_KEY,
            secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
        })
        const s3 = new AWS.S3({
            params: {
                Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            },
            region: 'us-east-2'
        })

        const file_key = 'uploads/' + Date.now().toString() + file.name.replace(' ', '-')


        const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: file_key,
            Body: file
        }

        const upload = s3.putObject(params).on('httpUploadProgress', evt => {
            console.log('Fazendo o upload para o S3...', parseInt(((evt.loaded*100)/evt.total).toString())) 
        }).promise()


        //quando a função upload for feita essa vai ser executada em seguida
        await upload.then(data => {
            console.log('o upload foi feito com sucesso', file_key)
        })

        return Promise.resolve({
            file_key,
            file_name: file.name
        })
    } catch (error) {
        
    }
}


// vai retornar um url publico para acessar o s3bucket para conseguirmos fazer o embed do pdf na tela
export function getS3Url(file_key: string) {
    const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.us-east-2.amazonaws.com/${file_key}`;
    return url
}