import { useGetSettingsQuery } from "@/features/profile/profileSlice";
import CheckboxField from "@/features/ui/CheckboxField";
import RadioGroup from "@/features/ui/RadioGroup";
import { useState } from "react";

type SettingsData = {
  sentenceMain: string;
  sentenceDisplay: string;
  wordMain: string;
  wordDisplay: string;
  sentencesLesson: string;
  sentencesLast: string;
  addToList: boolean;
};

export default function SettingsPage() {
  const { data: profile } = useGetSettingsQuery(null);

  const [state, setState] = useState<SettingsData>(profile);

  const handleChange = (name: string, val: string) => {
    setState((curr) => ({ ...curr, [name]: val }));
  };

  const sentenceDisplayOptions = [
    { label: "Table", value: "table" },
    { label: "Block", value: "block" },
  ];

  const sentenceMainOptions = [
    { label: "Main Language", value: "main" },
    { label: "Translation", value: "translation" },
  ];

  return (
    <main>
      <header>
        <h1>Settings</h1>
      </header>
      <section className="gap-0">
        <h2 className="bg-zinc-200 py-2 px-4">Account</h2>
        <div className="p-4 bg-zinc-100">
          <div className="flex items-center gap-3">
            <span>Name</span>
            <span className="btn btn-red">Enter Name</span>
          </div>
          <div className="flex items-center gap-3 my-3">
            <span>Email</span>
            <span className="btn btn-red">Enter Email</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Change Password</span>
          </div>
        </div>
      </section>
      <section className="gap-0">
        <h2 className="bg-zinc-200 py-2 px-4">Content</h2>
        <div className="p-4 bg-zinc-100">
          <p>Sentences</p>
          <RadioGroup
            label="Display Mode"
            name="sentenceDisplay"
            value={state.sentenceDisplay}
            onChange={handleChange}
            options={sentenceDisplayOptions}
          />
          <RadioGroup
            label="Display Language"
            name="sentenceMain"
            value={state.sentenceMain}
            onChange={handleChange}
            options={sentenceMainOptions}
          />
          <p>Words</p>
          {/* <CheckboxField
            label="Add to List"
            name="addToList"
            value={state?.addToList}
            onChange={handleChange}
          /> */}
          <div>
            <p>add to list</p>
            <p>
              <span>Show</span>
              <span>Hide</span>
            </p>
          </div>
          <div>
            <p>Images</p>
            <p>
              <span>Show</span>
              <span>Hide</span>
            </p>
          </div>
        </div>
      </section>
      <section className="gap-0">
        <div className="p-4 bg-zinc-100">
          <p>Last Open Page</p>
          <p>Current Lesson</p>
        </div>
      </section>
    </main>
  );
}
