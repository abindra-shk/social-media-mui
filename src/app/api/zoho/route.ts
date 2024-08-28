// src/app/api/auth/zoho/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { code } = await request.json();
  console.log('code====>',code)

  const clientId = "1000.MRUB4RWQJMYD0CYN6JW0VLAFXP0HTZ"; // Replace with your actual client ID
  const clientSecret = "6832ec2a4451c67fcdd346f8ba4fa0a036283168f9"; 
  const redirectUri = "http://localhost:3000/login";

  const tokenUrl = `https://accounts.zoho.com/oauth/v2/token`;

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        code,
      }),
    });

    const data = await response.json();
    console.log('data====>',data)

    if (!response.ok) {
      return NextResponse.json({ error: data.error_description || 'Token exchange failed' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error exchanging authorization code for token:", error);
    return NextResponse.json({ error: 'Error exchanging code' }, { status: 500 });
  }
}
