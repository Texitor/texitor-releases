interface TauriReleaseResponse {
  version: string;
  notes: string;
  pub_date: string;
  platforms: {
    "darwin-x86_64"?: {
      signature: string;
      url: string;
    };
    "darwin-aarch64"?: {
      signature: string;
      url: string;
    };
    "linux-x86_64"?: {
      signature: string;
      url: string;
    };
    "windows-x86_64"?: {
      signature: string;
      url: string;
    };
  };
}

const supportedTarget = ["linux", "darwin", "windows"];

const supportedArch = ["x86_64", "aarch64", "armv7"];

const latest: TauriReleaseResponse = {
  version: "0.0.1",
  notes: "See the assets to download and install this version.",
  pub_date: "2024-01-22T14:13:30.389Z",
  platforms: {
    "darwin-x86_64": {
      signature:
        "dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVTeTZNQnhyZVRWTm1yeXJHcXU4QTZ5TGR4QzVuek1Mc3NnOHB1cHJXb1A5dkFxcXowS25rcWErUGQ4aFg2WXZ3azdpVTZqZnVlUThOR09pNHB2enArWkM1ZFdOZm5RdFFJPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzA1OTMxOTk3CWZpbGU6VGV4aXRvci5hcHAudGFyLmd6CjJoc2FHUTZacVR0VmNENm93M29SOWdPR3RNMUVBbDdVeFg2MGRPRnJSVXpuK1ZjUjZiTU1ONFRDVVVQQ1BhRG5pTk5WRWtnUFd3TDl0WHBRMVBSU0JBPT0K",
      url: "https://github.com/ali-shahwali/texitor/releases/download/v0.0.1/Texitor_x64.app.tar.gz",
    },
    "windows-x86_64": {
      signature:
        "dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVTeTZNQnhyZVRWTmk4ZFdPcHA1Nm1TU2VDMVV1MldmbHFiR3h1VW1QdHBBT0xXREw5dUdTWUE3YnQvcGNldnV6S3M4SFFMczNUWlRHU0xMZGdRTXhVNE5CQ21zak95bGcwPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzA1OTMyODAzCWZpbGU6VGV4aXRvcl8wLjAuMV94NjRfZW4tVVMubXNpLnppcAptSk50T2l6TVYxTHFpenA4cUorNmtjUVlYZ0J2N1BMaDZrUlowVTFOa1dtcmpLOTgzTzJCalVVdndtMnM4aXgyZkc3SW1VWWFMc01tWjZhV2xtWHVDZz09Cg==",
      url: "https://github.com/ali-shahwali/texitor/releases/download/v0.0.1/Texitor_0.0.1_x64_en-US.msi.zip",
    },
  },
};

const server = Bun.serve({
  fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    const [_trail, target, arch, _currentVersion] = path.split("/", 4);

    if (!supportedTarget.includes(target)) {
      return new Response(
        JSON.stringify({
          message: "Unsupported target.",
        })
      );
    }

    if (!supportedArch.includes(arch)) {
      return new Response(
        JSON.stringify({
          message: "Unsupported architechture.",
        })
      );
    }

    return new Response(JSON.stringify(latest));
  },
});

console.log(
  `Texitor Releases API running on http://${server.hostname}:${server.port}`
);
