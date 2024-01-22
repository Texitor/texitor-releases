import latestJson from "./latest.json";

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

const latest: TauriReleaseResponse = latestJson;

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
