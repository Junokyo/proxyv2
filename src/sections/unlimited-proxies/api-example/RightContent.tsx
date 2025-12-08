/* eslint-disable @typescript-eslint/no-explicit-any */
import { LANGUAGES } from './ApiExampleSection';
import { CodeBlock } from './CodeBlock';

interface Props {
  language: string;
  destination: string;
  protocol: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  setProtocol: React.Dispatch<React.SetStateAction<string>>;
}

export default function RightContent({
  language,
  destination,
  protocol,
  setLanguage,
  setDestination,
  setProtocol,
}: Props) {
  return (
    <div className="bg-[#151a24] text-white rounded-lg p-4 md:p-6 w-full h-full flex flex-col gap-4">
      {/* Top controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Language */}
        <div>
          <label className="text-xs text-slate-400">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1 w-full rounded-md bg-[#1c2433] border border-slate-700 px-2 py-2 text-xs"
          >
            {LANGUAGES.map((l: any) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        {/* Destination site */}
        <div>
          <label className="text-xs text-slate-400">Destination site</label>
          <div className="mt-1 flex items-center gap-2">
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full rounded-md bg-[#1c2433] border border-slate-700 px-3 py-2 text-xs"
            />
            <button
              onClick={() => navigator.clipboard.writeText(destination)}
              className="border border-slate-700 p-2 rounded text-xs hover:bg-slate-700"
            >
              ⧉
            </button>
          </div>
        </div>

        {/* Protocol */}
        <div>
          <label className="text-xs text-slate-400">Protocol</label>
          <select
            value={protocol}
            onChange={(e) => setProtocol(e.target.value)}
            className="mt-1 w-full rounded-md bg-[#1c2433] border border-slate-700 px-2 py-2 text-xs"
          >
            <option value="http">HTTP</option>
            <option value="socks">SOCKS5</option>
          </select>
        </div>
      </div>

      {/* CODE BLOCK */}
      <CodeBlock
        language={language}
        destination={destination}
        protocol={protocol}
      />
    </div>
  );
}
