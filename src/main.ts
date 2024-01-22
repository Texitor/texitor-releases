interface TauriReleaseResponse {
  version: string;
  notes: string;
  pub_date: string;
  platforms: {
    "darwin-x86_64": {
      signature: string;
      url: string;
    };
    "darwin-aarch64": {
      signature: string;
      url: string;
    };
    "linux-x86_64": {
      signature: string;
      url: string;
    };
    "windows-x86_64": {
      signature: string;
      url: string;
    };
  };
}

const supportedTarget = ["linux", "darwin", "windows"];

const supportedArch = ["x86_64", "aarch64", "armv7"];

const currentVersion: TauriReleaseResponse = {
  version: "v1.0.0",
  notes: "Test version",
  pub_date: "2020-06-22T19:25:57Z",
  platforms: {
    "darwin-x86_64": {
      signature: "Content of app.tar.gz.sig",
      url: "https://github.com/username/reponame/releases/download/v1.0.0/app-x86_64.app.tar.gz",
    },
    "darwin-aarch64": {
      signature: "Content of app.tar.gz.sig",
      url: "https://github.com/username/reponame/releases/download/v1.0.0/app-aarch64.app.tar.gz",
    },
    "linux-x86_64": {
      signature: "Content of app.AppImage.tar.gz.sig",
      url: "https://github.com/username/reponame/releases/download/v1.0.0/app-amd64.AppImage.tar.gz",
    },
    "windows-x86_64": {
      signature:
        "Content of app-setup.nsis.sig or app.msi.sig, depending on the chosen format",
      url: "https://github.com/username/reponame/releases/download/v1.0.0/app-x64-setup.nsis.zip",
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

    return new Response(JSON.stringify(currentVersion));
  },
});

console.log(
  `Texitor Releases API running on http://${server.hostname}:${server.port}`
);
