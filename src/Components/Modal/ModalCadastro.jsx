import {Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody,
    ModalCloseButton, 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    Box} from "@chakra-ui/react";
import { useState } from "react";
import '../Modal/ModalCadastro'


    export const ModalCadastro = ({data, setData, dataEdit, isOpen, onClose})=>{
        const [numEdital, SetnumEdital] = useState(dataEdit.numEdital || "");
        const [tituloEdital, SettituloEdital] = useState(dataEdit.tituloEdital || "");
        const handleSave = () => {
            if(!numEdital || !tituloEdital)return;

            if(emailAlreadyExists()){
                return alert("Numero de edital já cadastrado");
            }
            if(Object.keys(dataEdit).length) {
                data[dataEdit.index] = {numEdital, tituloEdital}
            }

            const newDataArray = !Object.keys(dataEdit).length
            ?[...(data ? data :[]), {numEdital,tituloEdital}]
            :[...(data ? data :[])]

            localStorage.setItem("Edital",JSON.stringify(newDataArray));

            setData(newDataArray);

            onClose();
        }; 


        return(
            <div>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Cadastro de Editais</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <FormControl display="flex" flexDir="column" gap={4}>
                                <Box>
                                    <FormLabel>Numero</FormLabel>
                                    <Input 
                                        type="text"
                                        value={numEdital}
                                        onChange={(e) => SetnumEdital(e.target.value)}>
                                    </Input>
                                </Box>
                                <Box>
                                    <FormLabel>Titulo</FormLabel>
                                    <Input 
                                        type="text"
                                        value={tituloEdital}
                                        onChange={(e) => SettituloEdital(e.target.value)}>
                                    </Input>
                                </Box>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter justifyContent="start">
                            <Button colorScheme="#044CF4" mr={3} onClick={handleSave} >
                                Criar
                            </Button>
                            <Button colorScheme="red" mr={3} onClick={onClose} >
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                    
                </Modal>
            </div>
        )
    }