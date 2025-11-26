import { update, deleteDescription } from "../../api/apiDescription.js";
import { notify } from "../Toast/Toast.jsx";

// Fonction pour mettre à jour une description
export async function handleUpdateDescription(description, title, text, imageFile, onAction, closeDescription) {
    const finalTitle = title || description.title;
    const finalText = text || description.text;

    const formData = new FormData();
    formData.append("title", finalTitle);
    formData.append("text", finalText);
    if (imageFile) formData.append("image", imageFile);

    console.log("id description", description.id);
    try {
        const response = await update(description.id, formData);
        console.log("Description mise à jour :", response);
        if (onAction) onAction();
        notify("Description modifiée avec succès !");
    } catch (error) {
        notify("Erreur lors de la modification de la description.");
        return console.error("Erreur :", error);
    } finally {
        closeDescription();
    }
}

// Fonction pour supprimer une description
export async function handleDeleteDescription(descriptionId, onAction, closeDescription) {
    console.log("id description", descriptionId);
    try {
        const response = await deleteDescription(descriptionId);
        console.log("Description supprimée :", response);
        notify("Description supprimée avec succès !");
        if (onAction) onAction();
    } catch (error) {
        notify("Erreur lors de la suppression de la description.");
        return console.error("Erreur :", error);
    } finally {
        closeDescription();
    }
}
