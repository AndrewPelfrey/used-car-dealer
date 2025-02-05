import { Candidate } from "../interfaces/Candidate.interface";
const STORAGE_KEY = "bookmarked_candidates";

export const saveToLocalStorage = (candidates: Candidate[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
};

export const loadFromLocalStorage = (): Candidate[] => {
    const candidatesJSON = localStorage.getItem(STORAGE_KEY);
    if (candidatesJSON) {
        return JSON.parse(candidatesJSON) as Candidate[];
    } else {
        console.log("No candidates to load.")
    }
    return[];
};

export default { saveToLocalStorage, loadFromLocalStorage };