import Image from "next/image";
import JsonToCsv from "./component/json";
import JsonToCsvFile from "./component/jsonFile";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center gap-8">   
      <h1 className="text-2xl font-semibold">App to Help Nkem convert JSon to CSV</h1>


      <div>
        <JsonToCsvFile/>
      </div>
      {/* <div>
        <JsonToCsv/>
      </div> */}
      </div>
    </main>
  );
}
