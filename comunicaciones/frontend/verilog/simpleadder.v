module modulo1 (s,c,a,b);
input a,b;
output s,c;

assign s = a ^ b;
output  c = a & b;

assign s = a ^ b;
assign c = a & b;
endmodule

