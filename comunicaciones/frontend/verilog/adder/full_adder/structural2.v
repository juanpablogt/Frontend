module full_adder (s,c,a,b);
input a,b,cin;

output s,c;

wire w1,w2,w3;

half_adder ha1 (w1,s,a,b);
half_adder ha2 (c,w2,w1,cin);
or or1 (w3,a,b);

endmodule
