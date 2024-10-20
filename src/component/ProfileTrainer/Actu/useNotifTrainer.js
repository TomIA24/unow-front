import { Button } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { request } from "../../../core/api/request";
import Select from "../../../shared/components/Inputs/Select";
import { renderBCButton, renderResponseButton } from "./ActionButtons";
import styles from "./styles.module.css";

const useNotifTrainer = () => {
  const [openChange, setOpenChange] = useState(false);
  const [valueComment, setValueComment] = useState({
    Creator: "Me",
    Comment: ""
  });
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentElement, setCurrentElement] = useState("");
  const [currencySelection, setCurrencySelection] = useState({});

  const handleChange = (e) => {
    setValueComment((prev) => ({ ...prev, Comment: e.target.value }));
  };

  const getNotifTrainer = useCallback(() => {
    request.read("Trainer/GetNotifTrainer").then((data) => {
      setData(data?.data);
    });
  }, []);

  useEffect(() => getNotifTrainer(), [getNotifTrainer]);

  const handleUpdate = useCallback(
    async (id, status, price) => {
      const selectedCurrency = currencySelection[id] || "USD";
      const data = {
        reponseFormateur: status,
        prixFormateur: {
          value: price,
          currency: selectedCurrency || "USD"
        }
      };

      request.update(`Trainer/UpdateNotifTrainer`, id, data).then(() => {
        getNotifTrainer();
      });
    },
    [getNotifTrainer, currencySelection]
  );

  const renderCommentButton = (params) => (
    <Button
      sx={{ color: "red" }}
      onClick={() => {
        setCurrentElement(params.row.id);
        setComments(params.row.comments);
        setOpenChange(true);
      }}
    >
      Explore
    </Button>
  );

  const handleCurrencyChange = (id, newCurrency) => {
    setCurrencySelection((prev) => ({
      ...prev,
      [id]: newCurrency
    }));
  };

  const columns = useMemo(
    () => [
      { field: "subject", headerName: "Subject", width: 140 },
      { field: "date", headerName: "Date", width: 150 },
      {
        field: "TJ",
        headerName: "TJ (Fees Included)",
        width: 150,
        editable: true
      },
      {
        field: "Currency",
        headerName: "Currency",
        width: 150,
        editable: true,
        renderCell: (params) => {
          return (
            <Select
              className={styles.currencySelect}
              options={["USD", "EUR", "TND"]}
              value={currencySelection[params.row.id] || params.value}
              onChange={(e) =>
                handleCurrencyChange(params.row.id, e.target.value)
              }
            />
          );
        }
      },
      {
        field: "statusMandat",
        headerName: "Mandate Status",
        width: 150,
        renderCell: (params) => {
          let color = "";
          switch (params.value) {
            case "pending":
              color = "#CD6214";
              break;
            case "confirmed":
              color = "#41AD5E";
              break;
            case "closed":
              color = "#ff0b0b";
              break;
            default:
              color = "black";
          }

          return <span style={{ color }}>{params.value}</span>;
        }
      },
      { field: "NB", headerName: "NB d'inscrit", width: 130 },
      {
        field: "RF",
        headerName: "Trainer Response",
        width: 190,
        renderCell: (params) => renderResponseButton(params, handleUpdate)
      },
      {
        field: "BC",
        headerName: "Purchase Order",
        width: 190,
        renderCell: (params) => renderBCButton(params)
      },
      {
        field: "commentaire",
        headerName: "Comment",
        width: 190,
        renderCell: renderCommentButton
      }
    ],
    [handleUpdate, currencySelection]
  );

  const rows = useMemo(
    () =>
      data?.map((row) => ({
        id: row._id,
        subject: row.courseCertif,
        date: `${new Date(row.courseDate[0]).getDate()}/${
          new Date(row.courseDate[0]).getMonth() + 1
        } -> ${new Date(row.courseDate[1]).getDate()}/${
          new Date(row.courseDate[1]).getMonth() + 1
        } - ${new Date(row.courseDate[1]).getFullYear()}`,
        TJ: row.prixFormateur.value,
        Currency: row.prixFormateur.currency,
        statusMandat: row.StatusMandate,
        NB: row.nbInscrit,
        reponseFormateur: row.reponseFormateur,
        comments: row.comments
      })),
    [data]
  );

  const columnsComments = [
    { field: "Creator", headerName: "Creator", width: 140 },
    { field: "Comment", headerName: "Comment", width: 640 }
  ];

  const rowsComments = useMemo(
    () =>
      comments.map((row, index) => ({
        id: index,
        Creator: row.Creator,
        Comment: row.Comment
      })),
    [comments]
  );

  const SendComment = async () => {
    const jsonData = {
      data: { id: currentElement, comments: valueComment }
    };
    request.create("Trainer/UpdateCommentsNotifTrainer", jsonData).then(() => {
      getNotifTrainer();
      setOpenChange(false);
    });
  };

  return {
    openChange,
    setOpenChange,
    valueComment,
    handleChange,
    rows,
    columns,
    columnsComments,
    rowsComments,
    SendComment
  };
};

export default useNotifTrainer;
