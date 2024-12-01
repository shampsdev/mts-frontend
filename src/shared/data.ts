import { PersonNode } from "./interfaces/person-node.interface";

export const data: PersonNode[] = [
    {
        id: "unique-id-1",
        name: "Mike de Geofroy",
        status: "Working",
        image: "https://t.me/i/userpic/320/mikedegeofroy.jpg",
        jobtitle: "Team Lead",
        children: ["unique-id-2", "unique-id-3", "unique-id-4"],
        parents: []
    },
    {
        id: "unique-id-2",
        name: "Mike de Geofroy",
        status: "Working",
        image: "https://t.me/i/userpic/320/mikedegeofroy.jpg",
        jobtitle: "Frontend Developer",
        children: ["unique-id-6"],
        parents: ["unique-id-1"]
    },
    {
        id: "unique-id-6",
        name: "Michou de Geofroy",
        status: "Working",
        image: "https://t.me/i/userpic/320/mikedegeofroy.jpg",
        jobtitle: "Junior Frontend Developer",
        children: [],
        parents: ["unique-id-2"]
    },
    {
        id: "unique-id-5",
        name: "Mike de Geofroy",
        status: "Working",
        image: "https://t.me/i/userpic/320/mikedegeofroy.jpg",
        jobtitle: "Dev Ops",
        children: [],
        parents: ["unique-id-3"]
    },
    {
        id: "unique-id-3",
        name: "Mike de Geofroy",
        status: "Working",
        image: "https://thispersondoesnotexist.com/",
        jobtitle: "Backend Developer",
        children: ["unique-id-5"],
        parents: ["unique-id-1"]
    },
    {
        id: "unique-id-4",
        name: "Mike de Geofroy",
        status: "Working",
        image: "https://thispersondoesnotexist.com/",
        jobtitle: "QA",
        children: [],
        parents: ["unique-id-1"]
    }
]
