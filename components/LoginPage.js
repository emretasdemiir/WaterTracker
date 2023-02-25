import React, { useState } from "react";
import { Input, Icon, Stack, Button, Center, NativeBaseProvider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export default function LoginPage({ navigation }) {
    const [show, setShow] = useState(false)
    const [firstNameValue, setFirstNameValue] = React.useState("");
    const [lastNameValue, setLastNameValue] = React.useState("");
    const [ageValue, setAgeValue] = React.useState("");

    const handleChangeFirstName = text => setFirstNameValue(text);
    const handleChangeLastName = text => setLastNameValue(text);
    const handleChangeAge = text => setAgeValue(text);

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Stack space={4} w="100%" alignItems="center">
                    <Input w={{
                        base: "75%",
                        md: "25%"
                    }}
                        InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
                        placeholder="First Name"
                        onChangeText={handleChangeFirstName}
                        value={firstNameValue} />
                    <Input w={{
                        base: "75%",
                        md: "25%"
                    }}
                        InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} placeholder="Last Name"
                        onChangeText={handleChangeLastName}
                        value={lastNameValue} />
                    <Input w={{
                        base: "75%",
                        md: "25%"
                    }}
                        InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} placeholder="Age"
                        onChangeText={handleChangeAge}
                        value={ageValue} />
                    <Button
                        title="Go to Overview"
                        onPress={() => navigation.navigate('EntryPage')}
                        isDisabled={!firstNameValue || !lastNameValue || !ageValue}>
                        Go to Overview
                    </Button>
                </Stack>
            </Center>
        </NativeBaseProvider>
    );
};
