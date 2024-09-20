import React from "react";
import Image from "next/image";

export default function AddImageFeature({ setFile, styles }: any) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.key === "keydown" || e.key === "click") {
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [open]);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="mb-8 relative">
      <button type="button" className={styles.button} onClick={handleOpen}>
        <Image src="/images/plus.png" width={16} height={16} alt="plus" />
      </button>
      {open && (
        <div className={styles.add}>
          <input
            type="file"
            id="image"
            accept=".png,.jpeg,.jpg"
            style={{ display: "none" }}
            onChange={(e: any) => setFile(e.target?.files[0])}
          />
          <button type="button" className={styles.addButton}>
            <label htmlFor="image">
              <Image
                src="/images/image.png"
                width={16}
                height={16}
                alt="plus"
                className="cursor-pointer"
              />
            </label>
          </button>
        </div>
      )}
    </div>
  );
}
