import {
  Box,
  Button,
  Dialog,
  Field,
  Input,
  Stack,
} from "@chakra-ui/react";
import { type FormEvent, useState } from "react";

interface AddSnackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, fridgeLocation: string) => void;
  isPending: boolean;
}

const INPUT_STYLES = {
  border: "2px solid",
  borderColor: "border",
  borderRadius: "none",
  bg: "bg",
  fontFamily: "body",
  _focusVisible: {
    boxShadow: "4px 4px 0px #AB886D",
    borderColor: "#AB886D",
    outline: "none",
  },
} as const;

export const AddSnackDialog = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
}: AddSnackDialogProps) => {
  const [name, setName] = useState("");
  const [fridgeLocation, setFridgeLocation] = useState("");

  const handleOpenChange = ({ open }: { open: boolean }) => {
    if (!open) {
      setName("");
      setFridgeLocation("");
      onClose();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !fridgeLocation.trim()) return;
    onSubmit(name.trim(), fridgeLocation.trim());
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          border="3px solid"
          borderColor="border"
          borderRadius="none"
          boxShadow="6px 6px 0px var(--chakra-colors-border)"
        >
          <Dialog.Header>
            <Dialog.Title
              fontFamily="heading"
              fontWeight="800"
              letterSpacing="-0.02em"
            >
              Add Snack
            </Dialog.Title>
            <Dialog.CloseTrigger disabled={isPending} />
          </Dialog.Header>

          <Dialog.Body>
            <Box
              as="form"
              id="add-snack-form"
              onSubmit={handleSubmit}
            >
              <Stack gap={4}>
                <Field.Root required>
                  <Field.Label fontWeight="600" color="fg" fontFamily="body">
                    Name
                  </Field.Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Chips, Cookies..."
                    disabled={isPending}
                    {...INPUT_STYLES}
                  />
                </Field.Root>

                <Field.Root required>
                  <Field.Label fontWeight="600" color="fg" fontFamily="body">
                    Fridge Location
                  </Field.Label>
                  <Input
                    value={fridgeLocation}
                    onChange={(e) => setFridgeLocation(e.target.value)}
                    placeholder="e.g. Main Kitchen, Office"
                    disabled={isPending}
                    {...INPUT_STYLES}
                  />
                </Field.Root>
              </Stack>
            </Box>
          </Dialog.Body>

          <Dialog.Footer>
            <Button
              variant="ghost"
              onClick={onClose}
              disabled={isPending}
              fontFamily="body"
              fontWeight="600"
              borderRadius="none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="add-snack-form"
              loading={isPending}
              bg="#AB886D"
              color="fg"
              border="2px solid"
              borderColor="border"
              borderRadius="none"
              fontWeight="700"
              fontFamily="body"
              boxShadow="xs"
              _hover={{
                bg: "#AB886D",
                boxShadow: "3px 3px 0px var(--chakra-colors-border)",
                transform: "translate(-2px, -2px)",
              }}
              _active={{
                boxShadow: "none",
                transform: "translate(2px, 2px)",
              }}
            >
              Add Snack
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
