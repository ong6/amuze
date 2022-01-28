import {
  Button,
  Container,
  Icon,
  SimpleGrid,
  Skeleton,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { BsQuestionCircle } from "react-icons/bs";

export default function Whitelist() {
  const rentedItems = [];

  return (
    <Container bg={"white"} rounded="10" p={6}>
      <div className="flex items-center mb-4 space-x-2 text-gray-600">
        <div className="text-lg font-semibold text-black">Whitelist status</div>
        <Tooltip
          hasArrow
          label="Only users who are whitelisted are allowed to rent NFTs"
          placement="top"
        >
          <div className="items-center mb-1.5">
            <Icon as={BsQuestionCircle} />
          </div>
        </Tooltip>
      </div>

      <SimpleGrid columns={[1, 1, 1]} gap={10}>
        {rentedItems ? (
          rentedItems.map((item, index) => (
            <div className="div" key={index}>
              test
            </div>
          ))
        ) : (
          <>
            <Skeleton height={40} />
            <Skeleton height={40} />
          </>
        )}
        {/* <Button colorScheme="telegram" className="w-full">
          Redeem NFTs
        </Button> */}
      </SimpleGrid>
    </Container>
  );
}
