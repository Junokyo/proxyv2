/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  language: any;
  destination: any;
  protocol: any;
}

export function CodeBlock({ language, destination, protocol }: Props) {
  const renderCode = () => {
    switch (language) {
      case 'shell':
        return `curl -x "${protocol}://username:password@proxy.lunaproxy.com:12345" ${destination}`;
      case 'python':
        return `import requests\nproxies = {"${protocol}": "username:password@proxy.lunaproxy.com:12345"}\nprint(requests.get("${destination}", proxies=proxies).text)`;
      case 'node':
        return `import fetch from "node-fetch";\nconst res = await fetch("${destination}", { proxy: "${protocol}://username:password@proxy.lunaproxy.com:12345" });\nconsole.log(await res.text());`;
      default:
        return `Please order the unlimited residential proxy plan first`;
    }
  };

  return (
    <div className="mt-4 flex-1 overflow-auto rounded-md border border-slate-700 bg-[#0f131b] p-4 text-xs whitespace-pre-wrap text-slate-200">
      {renderCode()}
    </div>
  );
}
