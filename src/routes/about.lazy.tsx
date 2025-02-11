import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="px-3 w-full">
      <div className="max-w-[720px] w-full mx-auto font-public-sans text-textColor py-8">
        <p className="font-bold text-2xl mt-6 mb-2">About Konvertify</p>
        <p className="font-normal text-base">
          I created Konvertify because I was tired of clunky file converters! 😩
          I wanted something fast, secure, and private. So, I built it myself!
          Konvertify lets you convert images, audio, and video files right on
          your device, keeping your data safe and sound. 🔒
        </p>
        <p className="font-bold text-2xl mt-6 mb-2">
          Why You'll ❤️ Konvertify:
        </p>
        <ul
          className="list-disc space-y-2"
          style={{
            marginBlockStart: "1em",
            marginBlockEnd: "1em",
            marginInlineStart: "0px",
            marginInlineEnd: "0px",
            paddingInlineStart: "20px",
          }}
        >
          <li>
            <p className="font-normal text-base">
              <span className="font-semibold pr-2">Privacy Rocks! 🤘: </span>
              Your files never leave your computer. Seriously! I take your
              privacy super seriously.
            </p>
          </li>
          <li>
            <p className="font-normal text-base">
              <span className="font-semibold pr-2">Format Frenzy! 🤪: </span>
              Konvertify supports tons of formats – images, audio, videos, you
              name it! Get the flexibility you need.
            </p>
          </li>
          <li>
            <p className="font-normal text-base">
              <span className="font-semibold pr-2">Speed Demon 🏎️💨: </span>
              Konvertify is built for speed. Get your conversions done in a
              flash!
            </p>
          </li>
          <li>
            <p className="font-normal text-base">
              <span className="font-semibold pr-2">Totally Free! 🎁: </span>
              Yep, you read that right. Konvertify is completely free to use. No
              hidden fees, no subscriptions, just pure file conversion goodness.
            </p>
          </li>
          <li>
            <p className="font-normal text-base">
              <span className="font-semibold pr-2">
                Easy Peasy Lemon Squeezy! 🍋:{" "}
              </span>
              I made Konvertify super simple to use, even if you're not a tech
              whiz.
            </p>
          </li>
        </ul>
        <p className="font-bold text-2xl mt-6 mb-2">My Mission?</p>
        <p className="font-normal text-base">
          To make file conversion fun and accessible to everyone! Konvertify
          puts you in control of your multimedia, without sacrificing your
          privacy. I'm always working to make Konvertify even better, so join
          the community and let's build something amazing together! 🚀
        </p>
      </div>
    </div>
  );
}
