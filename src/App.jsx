import React, { useState, useCallback, useEffect } from "react";
import fse from "fs-extra";
import { remote } from "electron";

const paths = ["images", "masks", "prev_images", "prev_masks"];

const dialog = remote.dialog;
const dialogOptions = {
  title: "Select directory",
  properties: ["openDirectory"]
};

function App() {
  const [filesName, setFilesName] = useState([]);

  const proLoad = folderPath => {
    console.log(true);
    console.log(folderPath);
    console.log(filesName);
  };

  const proCreate = folderPath => {
    fse.ensureDir(`${folderPath}_mproj`, err => {
      if (err) throw err;
      paths.forEach(path => {
        fse.ensureDir(`${folderPath}_mproj/${path}`, err => {
          if (err) throw err;
        });
      });
      fse.copy(`${folderPath}`, `${folderPath}_mproj/${paths[0]}`, err => {
        if (err) throw err;
      });
    });
  };

  const fileLoad = useCallback(async () => {
    const { filePaths } = await dialog.showOpenDialog(dialogOptions);
    if (
      !!filePaths[0] &&
      filePaths[0].substr(filePaths.length - 7) !== "_mproj"
    ) {
      alert("폴더가 MangaProject 형식이 아닙니다.");
      // eslint-disable-next-line no-restricted-globals
      const result = confirm("MangaProject 폴더를 새로 생성하시겠습니까?");
      if (result) {
        alert("프로젝트 폴더를 새로 생성합니다.");
        proCreate(filePaths[0]);
      }
    } else if (!!filePaths[0]) {
      const folders = fse.readdirSync(filePaths[0]);
      if (folders[0] !== "images") {
        alert("망가진 프로젝트 폴더입니다. 삭제 후 다시 생성해주세요.");
      } else {
        fse.readdir(`${filePaths[0]}/images`, (err, files) => {
          if (err) throw err;
          proLoad(`${filePaths[0]}/images`, files);
        });
      }
    }
  }, [proLoad]);

  return (
    <div>
      <button onClick={fileLoad}>폴더를 불러오세요!</button>
    </div>
  );
}

export default App;
