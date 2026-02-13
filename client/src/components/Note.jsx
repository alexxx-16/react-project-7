import Button from "./Button";

const Note = ({ deleteNote, note }) => {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-md shadow-md flex flex-col gap-2 border border-transparent dark:border-zinc-800">
      <div className="flex justify-between items-start">
        <h2 className="text-xl capitalize text-yellow-500 dark:text-yellow-400 border-b-2 border-yellow-300 dark:border-zinc-700">
          {note.title}
        </h2>
        <Button onClick={() => deleteNote(note.id)}>Delete</Button>
      </div>

      <p className="font-light text-zinc-700 dark:text-zinc-300">
        {note.content}
      </p>
    </div>
  );
};

export default Note;
