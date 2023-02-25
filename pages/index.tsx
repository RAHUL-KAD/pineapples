import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Auth from "../componants/auth"

export default function Home() {

  // Firestore
  const db = firebase.firestore();

  // Destructure user, loading, and error out of the hook.
  const [user, loading, error] = useAuthState(firebase.auth() as any);
  // consol.log current user and loading state
  console.log("Loading: ", loading, "|", "Current user: ", user?.uid);

  const [votes, votesLoading, votesError] = useCollection(
    firebase.firestore().collection("votes") as any,
    {}
  );

  if (!votesLoading && votes) {
    votes.docs.map((doc) => console.log(doc.data()));
  }

  // Create document function
  const addVoteDocuments = async (vote: string) => {
    await db.collection("votes").doc(user?.uid).set({
      vote,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gridGap: 8,
        background:
          "linear-gradient(180deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
      }}
    >
      <Auth />
        <button 
        style={{ fontSize: 32, marginRight: 8, flexDirection: "row", display: "flex" }}
        onClick={() => addVoteDocuments("yes")}
        > 
        ✔️🍍🍕
        </button>
        <h3>
          Pineapple Lovers:{" "}
          {votes?.docs?.filter((doc) => doc.data().vote === "yes").length}
        </h3>
        <button 
        style={{ fontSize: 32, marginRight: 8, flexDirection: "row", display: "flex"}}
        onClick={() => addVoteDocuments("no")}
        > 
        ❌🍍🍕
        </button>
        <h3>
          Pineapple Lovers:{" "}
          {votes?.docs?.filter((doc) => doc.data().vote === "no").length}
        </h3>
      
    </div>
  );
}