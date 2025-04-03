import { createAutoDriveApi } from '@autonomys/auto-drive'
import { NetworkId } from '@autonomys/auto-utils'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Get the file from the request
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Create a generic file object
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const genericFile = {
      read: async function* () {
        yield buffer
      },
      name: file.name,
      mimeType: file.type,
      size: file.size,
      path: file.name,
    }

    // Initialize the API with proper API key from environment variables
    const api = createAutoDriveApi({
      apiKey: process.env.AUTO_DRIVE_API_KEY || '',
      network: NetworkId.TAURUS,
    })

    // Upload options
    const options = {
      password: process.env.ENCRYPTION_PASSWORD, // Get from environment variables
      compression: true,
      onProgress: (progress: number) => {
        console.log(`Upload is ${progress}% completed`)
      },
    }

    // Upload the file and get the CID
    const cid = await api.uploadFile(genericFile, options)

    // Return the CID and final progress in the response
    return NextResponse.json({
      success: true,
      cid: cid,
      progress: 100, // If we get here, the upload is 100% complete
      message: 'File uploaded successfully',
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      {
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'File upload API is operational',
  })
}
