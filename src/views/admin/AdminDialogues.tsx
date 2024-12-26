import FormCreateDialogue from "../../features/dialogue/FormCreateDialogue";
import { useState } from "react";

export default function AdminDialogues() {
  const [edit, setEdit] = useState(false);

  return (
    <div>
      {edit ? <FormCreateDialogue type="add" setShowForm={setEdit} /> : null}
    </div>
  );
}
