import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      return NextResponse.json(
        {
          error:
            "Missing GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or GOOGLE_REDIRECT_URI.",
        },
        { status: 500 }
      );
    }

    const url = new URL(req.url);

    const code = url.searchParams.get("code");
    const oauthError = url.searchParams.get("error");

    if (oauthError) {
      return NextResponse.json(
        {
          error: "Google authorization was cancelled or denied.",
          details: oauthError,
        },
        { status: 400 }
      );
    }

    if (!code) {
      return NextResponse.json(
        {
          error: "No authorization code was returned by Google.",
        },
        { status: 400 }
      );
    }

    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );

    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    console.log("GOOGLE OAUTH SUCCESS");

    if (tokens.refresh_token) {
      console.log("GOOGLE_REFRESH_TOKEN:", tokens.refresh_token);
    } else {
      console.log(
        "No refresh token returned. You may need to revoke the app permission and authorize again."
      );
    }

    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Google Calendar Connected</title>
          <style>
            body {
              background: #020617;
              color: white;
              font-family: Arial, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
            }

            .card {
              max-width: 600px;
              padding: 40px;
              border: 1px solid rgba(34, 211, 238, 0.3);
              border-radius: 24px;
              background: rgba(15, 23, 42, 0.9);
              text-align: center;
            }

            h1 {
              color: #67e8f9;
            }

            p {
              color: #cbd5e1;
              line-height: 1.7;
            }
          </style>
        </head>

        <body>
          <div class="card">
            <h1>Google Calendar Connected</h1>

            <p>
              Authorization was successful.
            </p>

            <p>
              You can close this page and return to your development environment.
            </p>
          </div>
        </body>
      </html>
      `,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } catch (error) {
    console.error("GOOGLE CALLBACK ERROR:", error);

    return NextResponse.json(
      {
        error: "Google Calendar authorization failed.",
      },
      { status: 500 }
    );
  }
}