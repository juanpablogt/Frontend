module structural (s,c,a,b);
input a,b;
output s,c;
xor xor1 (s,a,b);
and and1 (c,a,b);
endmodule

