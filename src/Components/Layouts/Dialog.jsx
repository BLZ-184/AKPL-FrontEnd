import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const Modals = ({ open, children, title, handler, setCancle, setConfirm }) => {
  return (
    <>
      <Dialog open={open} handler={handler}>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>{children}</DialogBody>
        <DialogFooter>
          {setCancle && (
            <Button
              variant="text"
              color="red"
              onClick={setCancle}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
          )}
          {setConfirm && (
            <Button variant="gradient" color="blue" onClick={setConfirm}>
              <span>Confirm</span>
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Modals;
