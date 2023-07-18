

export const validationDataStudent = (data: any, student: any): string[] => {
  const errors: string[] = [];


  for (let i = 0; i < data.listNotes.length; i++) {
    if (data.listNotes[i].stud?._id === student._id) {
      errors.push("Cet élève est attaché à la note. Il faut supprimer sa note.");

    }
  }

  if (data.selectListEcolage.length > 0 || data.selectListFrais.length > 0) {
    errors.push("Vous devez supprimer toute liste d'écolage ou de frais divers.");

  }

  return errors;
};
