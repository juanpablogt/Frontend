module full_adder (s,c,a,b);
input a,b,cin;
output s,c;

assign s = a ^ b ^ cin;
assign c = (a & b) | (a & cin) | (b & cin);

endmodule