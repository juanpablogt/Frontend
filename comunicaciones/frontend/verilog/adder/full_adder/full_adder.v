module full_adder (s,c,a,b);
input a,b,cin;
output s,c;

wire w1,w2,w3,w4;

xor xor1 (w1,a,b);
xor xor2 (s,w1,cin);
and and1 (w2,a,b);
and and2 (w3,w1,cin);
and and3 (w4,a,cin);
or or1 (c,w2,w3,w4);

endmodule


