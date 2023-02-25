import React from "react";
import { Input, Icon, Stack, Flex, Button, Text, Box } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function EntryPage({
    preSaveWaterDrunk,
    setPreSaveWaterDrunk,
    text,
    setText,
}) {
    const handleValue = (quantity) => {
        if (isNaN(quantity)) {
            setPreSaveWaterDrunk(0)
        }
        else {
            setPreSaveWaterDrunk(Number(quantity))
        }
    }

    const handleEntryText = (e) => {
        e.target.innerText
        setText(text === "ml" ? "L" : "ml")
        // setValue(e.target.innerText === "ml" ? Number(value / 1000) : Number(value * 1000))
        setPreSaveWaterDrunk(e.target.innerText === "ml" ? Number(waterDrunk / 1000) : Number(waterDrunk * 1000))
    }

    return (
        <Stack space={4} w="auto" alignItems="center" marginTop="auto" marginBottom="auto">
            <Input size="xl"
                mb="10"
                InputLeftElement={<Icon as={<MaterialCommunityIcons name="cup-water" size={24} color="black" />} size={5} ml="2" color="muted.400" />}
                // InputRightElement={<Text onPress={(e) => handleEntryText(e)}>{text}</Text>}
                keyboardType="number"
                placeholder="Enter water quantity"
                value={preSaveWaterDrunk}
                onChangeText={handleValue}
            />
            <Flex direction="row">
                <Button width="75px" size="lg" mr={"1.5"}
                    onPress={() => setPreSaveWaterDrunk(preSaveWaterDrunk + 250)}>
                    +250 ml
                </Button>
                <Button width="75px" size="lg" mr={"1.5"} bg="primary.500"
                    onPress={() => setPreSaveWaterDrunk(preSaveWaterDrunk + 500)}>
                    +500 ml
                </Button>
                <Button width="75px" size="lg" mr={"1.5"} bg="secondary.500"
                    onPress={() => setPreSaveWaterDrunk(preSaveWaterDrunk + 750)}>
                    +750 ml
                </Button>
                <Button width="75px" size="lg" mr={"1.5"} bg="secondary.700"
                    onPress={() => setPreSaveWaterDrunk(preSaveWaterDrunk + 1000)}>
                    +1 L
                </Button>
            </Flex>
            <Flex direction="row">
                <Button width="75px" size="lg" mr={"1.5"}
                    onPress={() => setPreSaveWaterDrunk((preSaveWaterDrunk - 250 < 0) ? 0 : preSaveWaterDrunk - 250)}>
                    -250 ml
                </Button>
                <Button width="75px" size="lg" mr={"1.5"} bg="primary.500"
                    onPress={() => setPreSaveWaterDrunk((preSaveWaterDrunk - 500 < 0) ? 0 : preSaveWaterDrunk - 500)}>
                    -500 ml
                </Button>
                <Button width="75px" size="lg" mr={"1.5"} bg="secondary.500"
                    onPress={() => setPreSaveWaterDrunk((preSaveWaterDrunk - 750 < 0) ? 0 : preSaveWaterDrunk - 750)}>
                    -750 ml
                </Button>
                <Button width="75px" size="lg" mr={"1.5"} bg="secondary.700"
                    onPress={() => setPreSaveWaterDrunk((preSaveWaterDrunk - 1000 < 0) ? 0 : preSaveWaterDrunk - 1000)}>
                    -1 L
                </Button>
            </Flex>
        </Stack>
    );
};
