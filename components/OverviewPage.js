import React, { useState, useEffect } from "react";
import { Input, Icon, Stack, Flex, Center, Button, Text, Modal, Box } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EntryPage from "./EntryPage";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OverviewPage() {
    const today = new Date()

    const date1 = today.getFullYear();
    const date2 = today.getMonth() + 1;
    const date3 = today.getDate();
    const formattedToday = date1 + "/0" + date2 + "/" + date3

    const [inputValue, setInputValue] = useState(0)
    const [text, setText] = useState("ml")
    const [showModal, setShowModal] = useState(false);
    const [preSaveWaterDrunk, setPreSaveWaterDrunk] = useState(0);
    const [waterDrunk, setWaterDrunk] = useState(0);
    const [selectedDate, setSelectedDate] = useState();

    const objectToStore = {
        date: selectedDate,
        inputValue: inputValue ? inputValue : 0,
        waterDrunk: waterDrunk ? waterDrunk : 0
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        storeData(objectToStore)
    }, [objectToStore])


    const storeData = async (objectToStore) => {
        try {
            const jsonValue = JSON.stringify(objectToStore)
            await AsyncStorage.setItem('@storedData', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storedData')

            const data = jsonValue != null ? JSON.parse(jsonValue) : null;
            console.log(data.date === selectedDate)

            data && setSelectedDate(data.date)
            data && setInputValue(data.inputValue)
            data && setWaterDrunk(data.waterDrunk)
            return data
        } catch (e) {
            // error reading value
        }
    }

    const handleValue = (quantity) => {
        if (isNaN(quantity)) {
            setInputValue(0)
        }
        else {
            setInputValue(Number(quantity))
        }
    }

    const handleText = (e) => {
        e.target.innerText
        setText(text === "ml" ? "L" : "ml")
        if (inputValue) {
            setInputValue(e.target.innerText === "ml" ? Number(inputValue / 1000) : Number(inputValue * 1000))
        }

        if (waterDrunk) {
            setWaterDrunk(e.target.innerText === "ml" ? Number(waterDrunk / 1000) : Number(waterDrunk * 1000))
        }
    }

    const handleModalSave = () => {
        if (text === "ml") {
            setWaterDrunk(preSaveWaterDrunk)
        }
        else {
            setWaterDrunk(preSaveWaterDrunk / 1000)
        }
        setShowModal(false)
    }

    const handleModalCancel = () => {
        setPreSaveWaterDrunk(waterDrunk)
        setShowModal(false)
    }

    return (
        <Stack space={4} w="100%" alignItems="center" marginTop="auto" marginBottom="auto">
            <Box width={"100%"} align={"center"} justify={"center"}>
                <DatePicker
                    mode="calendar"
                    disableDateChange
                    selected={getFormatedDate(selectedDate)}
                    onSelectedChange={date => setSelectedDate(date)}
                />
            </Box>
            <Flex direction={"column"} align={"baseline"} justify={"center"}>
                <Text fontSize={25} mb={"2"}>Water Need to Drink</Text>
                <Input size="xl"
                    mb="10"
                    InputLeftElement={<Icon as={<MaterialCommunityIcons name="cup-water" size={24} color="black" />} size={5} ml="2" color="muted.400" />}
                    InputRightElement={<Text width={"16px"} onPress={(e) => handleText(e)} marginRight={"2.5"}>{text}</Text>}
                    keyboardType="number"
                    placeholder="Enter water need to drink"
                    value={inputValue}
                    onChangeText={handleValue}
                />

                <Text fontSize={25} mb={"2"}>Amount Of Water Drunk</Text>
                <Text fontSize={22} mb={"2"}>
                    {waterDrunk}
                </Text>
                <Text fontSize={25} mt={"4"} mb={"2"}>Amount Of Water Remained</Text>
                <Text
                    fontSize={22}
                    mb={"2"}
                    style={{ color: inputValue === waterDrunk ? "green" : inputValue < waterDrunk && "red" }}
                >{(inputValue && waterDrunk) &&
                    (inputValue === waterDrunk) ? "You drank your daily need" : (inputValue > waterDrunk ? (inputValue - waterDrunk) :
                        inputValue < waterDrunk ? "You drank more than needed" : 0)
                    }
                </Text>
                {
                    inputValue > waterDrunk &&
                    <Text
                        fontSize={22}
                        mb={"2"}
                        style={{ color: inputValue > waterDrunk && "blue" }}
                    >
                        {inputValue > waterDrunk && "You need to drink more"}
                    </Text>
                }

            </Flex>
            <Center>
                <Button onPress={() => setShowModal(true)}>Enter Water Quantity</Button>
                <Modal isOpen={showModal} size={"xl"} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="auto">
                        <Modal.CloseButton />
                        <Modal.Header>Enter Amount Of Water Drunk</Modal.Header>
                        <Modal.Body>
                            <EntryPage
                                preSaveWaterDrunk={preSaveWaterDrunk}
                                setPreSaveWaterDrunk={setPreSaveWaterDrunk}
                                text={text}
                                setText={setText}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => handleModalCancel()}>
                                    Cancel
                                </Button>
                                <Button onPress={() => handleModalSave()}>
                                    Save
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Center>
        </Stack>
    );
};
