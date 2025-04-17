import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Image from "next/image";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

interface ModalProcessingProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalProcessing({
  openModal,
  setOpenModal,
}: ModalProcessingProps) {
  const progress = 33;

  return (
    <Dialog open={openModal} >
      <DialogContent className="bg-foreground flex">
        <div className="bg-background rounded-full h-13 w-auto">
          <Image
            src={"/loading.svg"}
            alt="Loading"
            fill={true}
            className="!sticky"
          />
        </div>
        <div className="flex flex-col gap-y-2 flex-1">
          <DialogHeader className="flex flex-row pt-1 h-13">
            <div className="h-full">
              <DialogTitle className="font-semibold text-background h-1/2 flex items-end">
                Processando
              </DialogTitle>
              <DialogDescription className="tracking-[.08em] h-1/2">
                Isso pode levar alguns segundos
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="w-full">
            <Progress value={progress} className="w-full" />
          </div>
          <p className="tracking-[.08em] text-background">{progress}%...</p>
          <DialogFooter className="flex justify-end">
            <DialogClose asChild>
              <Button className="tracking-[.08em] cursor-pointer bg-transparent border-none shadow-none hover:bg-primary" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
