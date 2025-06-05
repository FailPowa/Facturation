import { describe, it, expect } from 'vitest';
import {
    nomRules,
    adresseRules,
    codePostalRules,
    villeRules,
    mailRules,
    siretRules,
    numTvaRules
} from '../';


describe("Entrepris form rules tests", () => {

    describe("Tests sur les règles pour le nom de l'entreprise", () => {
        describe("Règle 1: Le nom de l'enteprise est requis.", () => {
                it("Nominal : Le nom est bien renseigné", () => {
                    const nom = "TestEntrepris";
                    expect(nomRules[0](nom)).toBe(true);
                });

                it("Échec : nom vide", () => {
                    const nom = "";
                    expect(nomRules[0](nom)).toBeTypeOf("string");
                });

                it("Échec : nom avec seulement des espaces", () => {
                    const nom = "     ";
                    expect(nomRules[0](nom)).toBeTypeOf("string");
                });

                it("Limite : nom avec un seul caractère", () => {
                    const nom = "A";
                    expect(nomRules[0](nom)).toBe(true);
                });
        })
    })

    describe("Tests sur les règles pour l'adresse de l'entreprise", () => {
        describe("Règle 1 : L'adresse est requise.", () => {
            it("Nominal : L'adresse est fournie", () => {
                const adresse = "15 rue du Boulevard";
                expect(adresseRules[0](adresse)).toBe(true);
            })

            it("Echec: Espace uniquement", () => {
                const adresse = "     ";
                expect(adresseRules[0](adresse)).toBeTypeOf("string");
            })
    
            it("Echec: Chaine vide", () => {
                const adresse = "";
                expect(adresseRules[0](adresse)).toBeTypeOf("string");
            })
        })
    })

    describe("Tests sur les règles pour le code postal de l'entreprise", () => {
        describe("Règle 1 : Le code postal est requis.", () => {
            it("Nominal : Le code postal est fourni.", () => {
                const codePostal = "97420"
                expect(codePostalRules[0](codePostal)).toBe(true);
            })
    
            it("Echec : Espaces uniquement", () => {
                const codePostal = "     "
                expect(codePostalRules[0](codePostal)).toBeTypeOf("string");
            })

            it("Echec : Chaine vide", () => {
                const codePostal = ""
                expect(codePostalRules[0](codePostal)).toBeTypeOf("string");
            })
        })
    })

    describe("Tests sur les règles pour la ville de l'entreprise", () => {
        describe("Règle 1 : La ville est requise.", () => {
            it("Nominal : La ville est fournie", () => {
                const ville = "Berlin"
                expect(villeRules[0](ville)).toBe(true);
            })

            it("Echec : Espaces uniquement", () => {
                const ville = "     "
                expect(villeRules[0](ville)).toBeTypeOf("string");
            })

            it("Echec : Chaine vide", () => {
                const ville = ""
                expect(villeRules[0](ville)).toBeTypeOf("string");
            })
        })
    })

    describe("Tests sur les règles pour le numéro de Tva de l'entreprise", () => {
        // Règle 1 : Le mail est requis
        describe("Règle 1 : Le mail est requis", () => {
            it("Nominal : Le mail est fourni", () => {
                const mail = "user@example.com";
                expect(mailRules[0](mail)).toBe(true);
            });

            it("Échec : chaîne vide", () => {
                const mail = "";
                expect(mailRules[0](mail)).toBeTypeOf("string");
            });

            it("Échec : espaces uniquement", () => {
                const mail = "    ";
                expect(mailRules[0](mail)).toBeTypeOf("string");
            });

            it("Limite : un seul caractère", () => {
                const mail = "a";
                expect(mailRules[0](mail)).toBe(true);
            });
        });

        // Règle 2 : Le format du mail
        describe("Règle 2 : Le format de mail est valide", () => {
            it("Nominal : le mail est valide", () => {
                const mail = "user.name@example.fr";
                expect(mailRules[1](mail)).toBe(true);
            });

            it("Échec : pas d'@", () => {
                const mail = "userexample.com";
                expect(mailRules[1](mail)).toBeTypeOf("string");
            });

            it("Échec : pas de domaine", () => {
                const mail = "user@";
                expect(mailRules[1](mail)).toBeTypeOf("string");
            });

            it("Échec : pas de nom d'utilisateur", () => {
                const mail = "@example.com";
                expect(mailRules[1](mail)).toBeTypeOf("string");
            });

            it("Échec : double point dans le domaine", () => {
                const mail = "user@ex..com";
                expect(mailRules[1](mail)).toBeTypeOf("string");
            });

            it("Limite : longueur max avant @", () => {
                const user = "a".repeat(64); // 64 caractères
                const mail = `${user}@example.com`;
                expect(mailRules[1](mail)).toBe(true);
            });

            it("Limite : plus de 64 caractères avant @", () => {
                const user = "a".repeat(65); // 65 caractères
                const mail = `${user}@example.com`;
                expect(mailRules[1](mail)).toBeTypeOf("string");
            });

            it("Limite : sous-domaines valides", () => {
                const mail = "user@mail.sub.example.com";
                expect(mailRules[1](mail)).toBe(true);
            });

            it("Limite : caractères spéciaux valides", () => {
                const mail = "user.name+alias@example.co.uk";
                expect(mailRules[1](mail)).toBe(true);
            });
        });
    });

    describe("Tests sur les règles pour le numéro de Tva de l'entreprise", () => {
        describe("Règle 1: Le numéro de TVA est valide. (contient 13 caratères)", () => {
            it("Nominal : Le numéro de Tva est correcte (13 caractères)", () => {
                const numTva = "FR77889900112"
                expect(numTvaRules[0](numTva)).toBe(true);
            })
            
            it("Valide : Avec espaces", () => {
                const numTva = "FR77 889 900 112"
                expect(numTvaRules[0](numTva)).toBe(true);
            })

            it("Echec : Le numéro de Tva est incorrect", () =>{
                const numTva = "12300499";
                expect(numTvaRules[0](numTva)).toBeTypeOf("string");
            })
    
            it("Limite : Le numéro de Tva est incorrect (en dessous de 13 caractères)", () => {
                const numTva = "A";
                expect(numTvaRules[0](numTva)).toBeTypeOf("string");
            })

            it("Limite : Le numéro de Tva est incorrect (au dessus de 13 caractères)", () => {
                const numTva = "9".repeat(20);
                expect(numTvaRules[0](numTva)).toBeTypeOf("string");
            })

        })
    })

    describe("Tests sur les règles pour le numéro de SIRET de l'entreprise", () => {
        describe("Règle 1 : Le numéro de SIRET est requis", () => {
            it("Nominal : numéro présent", () => {
                const siret = "12345678901234";
                expect(siretRules[0](siret)).toBe(true);
            });

            it("Échec : vide", () => {
                const siret = "";
                expect(siretRules[0](siret)).toBeTypeOf("string");
            });

            it("Échec : uniquement des espaces", () => {
                const siret = "    ";
                expect(siretRules[0](siret)).toBeTypeOf("string");
            });
        });

        describe("Règle 2 : Le numéro ne doit contenir que des chiffres (espaces exclus)", () => {
            it("Nominal : que des chiffres", () => {
                const siret = "12345678901234";
                expect(siretRules[1](siret)).toBe(true);
            });

            it("Valide : chiffres + espaces", () => {
                const siret = "1234 5678 9012 34";
                expect(siretRules[1](siret)).toBe(true);
            });

            it("Échec : lettres incluses", () => {
                const siret = "12345678ABCD34";
                expect(siretRules[1](siret)).toBeTypeOf("string");
            });

            it("Échec : caractères spéciaux", () => {
                const siret = "12345678-9012";
                expect(siretRules[1](siret)).toBeTypeOf("string");
            });
        });

        describe("Règle 3 : Le numéro doit contenir exactement 14 chiffres", () => {
            it("Nominal : 14 chiffres", () => {
                const siret = "12345678901234";
                expect(siretRules[2](siret)).toBe(true);
            });

            it("Valide : 14 chiffres avec espaces", () => {
                const siret = "1234 5678 9012 34";
                expect(siretRules[2](siret)).toBe(true);
            });

            it("Échec : trop court", () => {
                const siret = "1234567890123";
                expect(siretRules[2](siret)).toBeTypeOf("string");
            });

            it("Échec : trop long", () => {
                const siret = "123456789012345";
                expect(siretRules[2](siret)).toBeTypeOf("string");
            });
        });

        describe("Règle 4 : Le numéro doit passer l'algorithme de Luhn", () => {
            it("Nominal : numéro valide (ex : INSEE)", () => {
                const siret = "73282932000074"; // SIRET valide de test
                expect(siretRules[3](siret)).toBe(true);
            });

            it("Valide : numéro avec espaces", () => {
                const siret = "7328 2932 0000 74";
                expect(siretRules[3](siret)).toBe(true);
            });

            it("Échec : SIRET invalide (échec de Luhn)", () => {
                const siret = "12345678901234";
                expect(siretRules[3](siret)).toBeTypeOf("string");
            });
        });
    });

});
