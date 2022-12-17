import Text "mo:base/Text";
import List "mo:base/List";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Nat "mo:base/Nat";

actor DKeeper {
  public type Note = {
    title : Text;
    content : Text;
  };

  stable var notes : List.List<Note> = List.nil<Note>();

  public query func getNotes() : async [Note] {
    var array = List.toArray(notes);
    return array;
  };

  public func createNote(titleText : Text, contentText : Text) {
    let newNote : Note = {
      title = titleText;
      content = contentText;
    };

    notes := List.push(newNote, notes);
    Debug.print(debug_show (notes));
  };

  public func deleteNote(noteId : Nat) {
    var noteIndex : Nat = noteId + 1;
    var noteToDelete : ?Note = List.get(notes, noteIndex);

    switch noteToDelete {
      case (?noteToDelete) {
        notes := List.filter(notes, func(note : Note) : Bool { note != noteToDelete });
      };
      case null { Debug.print("Invalid item.") };
    };
  };
};
