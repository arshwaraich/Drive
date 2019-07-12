#include <iostream>

int main(int argc, char* argv[])
{
	char reg = 0x00;			//8-bit register
	char data;					//1-byte of data to be passed through the register
	char input;					//the input bit
	char bit4, bit1, bit7;

	data = 0x9C;				//10011100
	bit4 = bit1 = bit7 = 0x00;	//Init for clean calculation

	//Loop through the data one bit at a time, feeding the data into the register
	for (int x = 0; x < 8; x++)
	{
		input = ((data << x) & 0x80) >> 7;		//Get the data bit
		bit7 = (reg & 0x80) >> 7;
		bit4 = (reg & 0x10) >> 4;
		bit1 = (reg & 0x02) >> 1;
		std::cout << "Input: " << (unsigned int)input << " ";
		std::cout << "bit7 : " << (unsigned int)bit7 << " ";
		std::cout << "bit4 : " << (unsigned int)bit4 << " ";
		std::cout << "bit1 : " << (unsigned int)bit1 << std::endl;

		reg = reg << 1;

		//print out the binary representation of the bit register
		for (int z = 0; z < 8; z++)
			std::cout << (unsigned int)(((reg << z) & 0x80) >> 7);

		std::cout << std::endl;
		reg = reg ^ (bit4 << 5);

		//print out the binary representation of the bit register
		for (int z = 0; z < 8; z++)
			std::cout << (unsigned int)(((reg << z) & 0x80) >> 7);

		std::cout << std::endl;
		reg = reg ^ (bit1 << 2);

		reg += (bit7 ^ input);

		//print out the binary representation of the bit register
		for (int z = 0; z < 8; z++)
			std::cout << (unsigned int)(((reg << z) & 0x80) >> 7);

		std::cout << std::endl;
	}

	return 1;
}