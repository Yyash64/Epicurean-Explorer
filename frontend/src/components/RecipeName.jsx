import React from "react";
import styles from "./Ingredients/ingredient.module.css";
import { Link } from "react-router-dom";

const RecipeName = ({id, title, image, handleFavourite,description }) => {
  return (
    <div className={styles.galileoDesign}>
      <main className={styles.depth0Frame0}>
        <section className={styles.frameSave}>
          <div className={styles.grilledSalmonWithAvocadoSa}>
            <div className={styles.grilledSalmonWithAvocadoSaInner}>
              <div className={styles.depth6Frame0Parent}>
              <Link to={`/recipe/${id}`}>
                <img
                  className={styles.depth6Frame05}
                  loading="lazy"
                  alt=""
                  src={`${image}`}
                /></Link>
                <div className={styles.frameGrilling}>
                  <div className={styles.depth7Frame03}>
                    <div className={styles.depth8Frame02}>
                      <div className={styles.depth9Frame0}>
                        <div className={styles.depth10Frame0} style={{width:"100%"}}>
                          <h1 className={styles.grilledSalmonWith} style={{width:"100%",fontSize:"2.65rem"}}>{title}</h1>
                        </div>
                      </div>
                      <div className={styles.depth9Frame1}>
                        <div className={styles.depth10Frame01}>
                          <div
                            className={styles.thisGrilledSalmon}
                            style={{ marginTop: "-40px",width:"100%" }}
                          >
                            {description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.frameSeasoning}>
                    <button className={styles.depth8Frame03} style={{ marginTop: "0px" }}>
                      <div className={styles.depth9Frame01}>
                        <div className={styles.depth10Frame02}>
                          <b className={styles.save} onClick={handleFavourite} >
                            Favourite
                          </b>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RecipeName;
