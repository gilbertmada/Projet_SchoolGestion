

export const validationData = (dataProf: any, prof: any): string[] => {
  const errors: string[] = [];


  for (let i = 0; i < dataProf.length; i++) {
    if (dataProf[i].prof?._id === prof._id) {
      errors.push("Cet enseignant est attaché au module classe. Il faut supprimer ses informations.");

    }
  }


  return errors;
};
