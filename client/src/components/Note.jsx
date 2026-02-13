import Button from "./Button";

const Note = ({ deleteNote, note }) => {
  return (
    <div className="bg-zinc-100 p-4 rounded-md shadow-md flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="text-xl text-yellow-500">{note.title}</h2>
        <Button onClick={() => deleteNote(note.id)}>Delete</Button>
      </div>

      <p className="font-light">{note.content}</p>
    </div>
  );
};

export default Note;
